import { bold, green, magenta, yellow } from "./imports/colors.ts";
import { Log, Clear, Exit } from "./programs/in_out/out.ts";
import { Commander } from "./components/commander.ts";
import { Servis } from "./programs/servis/main.ts";
import { Router } from "./components/router.ts";
<<<<<<< HEAD
import { Show } from "./programs/file_system/show.ts";
import { Read } from "./programs/file_system/read.ts";
import { Cd } from "./programs/file_system/cd.ts";
import { Write } from "./programs/file_system/write.ts";
import { MemoryStorage } from "./components/storage.ts";
import { join } from "./imports/path.ts";

export async function main() {
    const storage = await new MemoryStorage(
        join(Router.instance.getPrivateRoute(), "term_settings.json")
    ).load();
=======
import { Show } from "./programs/fs/show.ts";
import { Read } from "./programs/fs/read.ts";
import { Path } from "./utils/path.ts";
import { Cd } from "./programs/fs/cd.ts";
import { Capitalize } from "./utils/fmt.ts";

const router = new Router(Path.instance);
>>>>>>> 718dcae58fe40eb30b61e99253448a1bec91936b

    const commander = new Commander([
        new Clear(),
        new Log(),
        new Exit(storage),
        new Cd(Router.instance),
        new Show(Router.instance),
        new Read(),
        new Servis(Router.instance),
        new Write(Router.instance),
    ]);

<<<<<<< HEAD
    while (true) {
        const publicRoute = Router.instance.backslash().getPublicRoute();
        const route = `~${publicRoute.length ? "/" : ""}${publicRoute}`;
        const folder = sentenceCase(Router.instance.getCurrentFolder());
        const user = sentenceCase(Router.instance.getCurrentUser());

        await commander.start(`${green(folder)} ${magenta(user)} ${yellow(route)} \n${bold("$")}`);
    }
=======
while (true) {
    const publicRoute = router.getPublicRoute().replaceAll("\\", "/");
    const route = `~${publicRoute.length ? "/" : ""}${publicRoute}`;
    const folder = Capitalize(router.getCurrentFolder());
    const user = Capitalize(router.getCurrentUser());

    await commander.start(
        bold(`${green(folder)} ${magenta(user)} ${yellow(route)} \n${bold("$")}`)
    );
>>>>>>> 718dcae58fe40eb30b61e99253448a1bec91936b
}

await main();
