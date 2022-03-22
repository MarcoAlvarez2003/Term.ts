import { bold, green, magenta, yellow } from "./imports/colors.ts";
import { Log, Clear, Exit } from "./programs/in_out/out.ts";
import { Commander } from "./components/commander.ts";
import { Servis } from "./programs/servis/main.ts";
import { sentenceCase } from "./imports/case.ts";
import { Router } from "./components/router.ts";
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

    while (true) {
        const publicRoute = Router.instance.backslash().getPublicRoute();
        const route = `~${publicRoute.length ? "/" : ""}${publicRoute}`;
        const folder = sentenceCase(Router.instance.getCurrentFolder());
        const user = sentenceCase(Router.instance.getCurrentUser());

        await commander.start(`${green(folder)} ${magenta(user)} ${yellow(route)} \n${bold("$")}`);
    }
}

await main();
