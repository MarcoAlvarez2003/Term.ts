import { bold, green, magenta, yellow } from "./imports/colors.ts";
import { Log, Clear, Exit } from "./programs/inout/out.ts";
import { Commander } from "./components/commander.ts";
import { Servis } from "./programs/servis/main.ts";
import { Router } from "./components/router.ts";
import { Show } from "./programs/fs/show.ts";
import { Read } from "./programs/fs/read.ts";
import { Path } from "./utils/path.ts";
import { Cd } from "./programs/fs/cd.ts";
import { Capitalize } from "./utils/fmt.ts";

const router = new Router(Path.instance);

const commander = new Commander([
    new Clear(),
    new Log(),
    new Exit(),
    new Cd(router),
    new Show(router),
    new Read(router),
    new Servis(router),
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
