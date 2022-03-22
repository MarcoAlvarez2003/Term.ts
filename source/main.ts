import { bold, green, magenta, yellow } from "./imports/colors.ts";
import { Log, Clear, Exit } from "./programs/in_out/out.ts";
import { Commander } from "./components/commander.ts";
import { Servis } from "./programs/servis/main.ts";
import { Router } from "./components/router.ts";
import { Show } from "./programs/file_system/show.ts";
import { Read } from "./programs/file_system/read.ts";
import { Cd } from "./programs/file_system/cd.ts";
import { Write } from "./programs/file_system/write.ts";
import { MemoryStorage } from "./components/storage.ts";
import { join } from "./imports/path.ts";
import { Path } from "./utils/path.ts";
import { Capitalize } from "./utils/fmt.ts";

const router = new Router(Path.instance);

const commander = new Commander([
    new Clear(),
    new Log(),
    new Exit(),
    new Cd(Router.instance),
    new Show(Router.instance),
    new Read(),
    new Servis(Router.instance),
    new Write(Router.instance),
]);

while (true) {
    const publicRoute = router.getPublicRoute().replaceAll("\\", "/");
    const route = `~${publicRoute.length ? "/" : ""}${publicRoute}`;
    const folder = Capitalize(router.getCurrentFolder());
    const user = Capitalize(router.getCurrentUser());

    await commander.start(
        bold(`${green(folder)} ${magenta(user)} ${yellow(route)} \n${bold("$")}`)
    );
}
