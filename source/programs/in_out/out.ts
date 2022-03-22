import { Command } from "../../components/commander.ts";
import { Token } from "../../components/parser.ts";
import { MemoryStorage } from "../../components/storage.ts";

export class Log implements Command {
    public target = /log/;

    render(...args: Token[]): void {
        console.log();

        console.log(
            ...args.map((arg) => {
                return arg.body;
            })
        );

        console.log();
    }
}

export class Clear implements Command {
    public target = /(clear)/;

    render(..._args: Token[]): void {
        console.clear();
    }
}

export class Exit implements Command {
    public target = /(exit)/;

    constructor(private storage: MemoryStorage) {}

    async render(...args: Token[]) {
        await this.storage.save();

        if (args.length) {
            const [{ body }] = args;

            if (typeof body === "string") {
                Deno.exit(parseInt(body));
            }
        }

        Deno.exit(0);
    }
}
