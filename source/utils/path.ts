import { join } from "../imports/path.ts";
import { exist } from "./fs.ts";

class NonExistFolder extends Error {
    public dir: string;

    constructor(name: string) {
        super(`NonExist folder ${name}`);

        this.name = "NonExistFolder";
        this.dir = name;
    }
}

class NotAllowedPath extends Error {
    public path: string;

    constructor(path: string) {
        super(`Cannot access to ${path}`);
        this.name = "NotAllowedPath";
        this.path = path;
    }
}

class Path {
    public static instance = new Path();
    public root: string[] = [];
    public path: string[] = [];
    public user: string = "";
    public disk: string = "";

    protected symbols = {
        home: "~",
    };

    constructor(public location = Deno.cwd(), public os = Deno.build.os) {
        this.update();
    }

    public async push(...folders: string[]) {
        for (const folder of folders) {
            this.hasLocation(folder) ? this.handle(folder) : await this.append(folder);
        }
    }

    protected hasLocation(symbol: string) {
        return Object.values(this.symbols).includes(symbol);
    }

    protected async append(folder: string) {
        const last = this.location;

        try {
            const path = join(this.location, folder);

            if (!(await exist(path))) {
                throw new NonExistFolder(folder);
            }

            if (!this.path.length) {
                throw new NotAllowedPath(path);
            }

            this.location = path;
        } catch (error) {
            this.location = last;

            throw error;
        }

        this.update();
    }

    protected handle(symbol: string) {
        if (symbol === this.symbols.home) {
            this.location = Deno.cwd();
        }

        this.update();
    }

    protected update() {
        const folders = this.getFilterFolders();

        if (this.os === "windows") {
            const [disk, _, user, ...path] = folders;

            this.root = [disk, _, user];
            this.path = path;
            this.user = user;
            this.disk = disk;
        }

        if (this.os === "linux") {
            const [disk, user, ...path] = folders;

            this.root = [disk, user];
            this.path = path;
            this.user = user;
            this.disk = disk;
        }
    }

    protected getFilterFolders() {
        return this.getFolders().filter((dir) => dir !== "");
    }

    protected getFolders() {
        return this.getFormatLocation().split("/");
    }

    protected getFormatLocation() {
        return this.location.replace(/\\/g, "/");
    }
}

export { Path, NonExistFolder, NotAllowedPath };
