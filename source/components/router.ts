import { basename, join } from "../imports/path.ts";
import { bold, red } from "../imports/colors.ts";
import { formatRoute } from "../utils/fmt.ts";
import { getRoute } from "../utils/route.ts";
import { NonExistFolder, NotAllowedPath, Path } from "../utils/path.ts";

export class Router {
    constructor(private path: Path) {}

    public async goto(route: string) {
        const _route = getRoute(formatRoute(route));

        if (_route.isAbsolute) {
            this.path.location = join(...this.path.root);
            this.path.path.length = 0;
        }

        try {
            await this.path.push(..._route.folders);
        } catch (_) {
            this.NonExistFolder(_);
        }
    }

    public back() {
        if (this.path.path.length) {
            this.path.path.pop();
        }

        this.path.location = join(...this.path.root, ...this.path.path);
    }

    public getCurrentFolder() {
        return basename(this.path.location);
    }

    public getCurrentRoute() {
        return this.path.location;
    }

    public getCurrentUser() {
        return this.path.user;
    }

    public getCurrentDisk() {
        return this.path.disk;
    }

    public getPublicRoute() {
        return this.path.path.join("\\");
    }

    public getPrivateRoute() {
        return this.path.root.join("\\");
    }

    private NonExistFolder(error: NotAllowedPath | NonExistFolder) {
        if (error instanceof NonExistFolder) {
            console.log(`${red("NonExist Folder")}: ${bold(error.dir)}`);
        }

        if (error instanceof NotAllowedPath) {
            console.log(`${red("NotAllowedPath")}: ${bold(error.path)}`);
        }
    }
}
