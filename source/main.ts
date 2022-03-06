import { bold, green, magenta, yellow } from "./imports/colors.ts";
import { Log, Clear, Exit } from "./programs/inout/out.ts";
import { Commander } from "./components/commander.ts";
import { Servis } from "./programs/servis/main.ts";
import { sentenceCase } from "./imports/case.ts";
import { Router } from "./components/router.ts";
import { Show } from "./programs/fs/show.ts";
import { Read } from "./programs/fs/read.ts";
import { getPath } from "./utils/path.ts";
import { Cd } from "./programs/fs/cd.ts";

const router = new Router(getPath());

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
    const folder = sentenceCase(router.getCurrentFolder());
    const user = sentenceCase(router.getCurrentUser());

    await commander.start(`${green(folder)} ${magenta(user)} ${yellow(route)} \n${bold("$")}`);
}
