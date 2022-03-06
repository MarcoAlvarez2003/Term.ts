import { basename, join } from "../imports/path.ts";
import { bold, red } from "../imports/colors.ts";
import { formatRoute } from "../utils/fmt.ts";
import { getRoute } from "../utils/route.ts";
import { Path } from "../utils/path.ts";
import { exist } from "../utils/fs.ts";

export class Router {
    constructor(private path: Path) {}

    public async goto(route: string) {
        const _route = getRoute(formatRoute(route));

        if (_route.isAbsolute) {
            this.path.route = join(...this.path.private);
            this.path.public.length = 0;
        }

        for (const folder of _route.folders) {
            const route = join(this.path.route, folder);

            if (folder === "..") {
                this.back();
                continue;
            }

            if (await exist(route)) {
                this.path.public.push(folder);
                this.path.route = route;
                continue;
            }

            this.NonExistFolder(folder);
        }
    }

    public back() {
        if (this.path.public.length) {
            this.path.public.pop();
        }

        this.path.route = join(...this.path.private, ...this.path.public);
    }

    public getCurrentFolder() {
        return basename(this.path.route);
    }

    public getCurrentRoute() {
        return this.path.route;
    }

    public getCurrentUser() {
        return this.path.name;
    }

    public getCurrentDisk() {
        return this.path.disk;
    }

    public getPublicRoute() {
        return this.path.public.join("\\");
    }

    public getPrivateRoute() {
        return this.path.private.join("\\");
    }

    private NonExistFolder(folder: string) {
        console.log(`${red("NonExist Folder")}: ${bold(folder)}`);
    }
}
