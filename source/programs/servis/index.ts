import { Application, send } from "../../imports/oak.ts";
import { Config, getConfig } from "./config.ts";

async function runServis({ home, root, port }: Config) {
    const url = ` http://localhost:${port}`;
    const app = new Application();

    app.use(async (ctx, next) => {
        try {
            console.log(`Get ${ctx.request.url.pathname}`);

            await send(ctx, ctx.request.url.pathname, {
                index: home,
                root: root,
            });
        } catch (_) {
            await next();
        }
    });

    console.log(`Listening on ${url}`);

    await app.listen({
        hostname: "localhost",
        port: port,
    });
}
if (import.meta.main) {
    await runServis(getConfig());
}

export { runServis };
