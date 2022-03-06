import { Command } from "../../components/commander.ts";
import { Token } from "../../components/parser.ts";

export class Log implements Command {
    public target = /log/;

    render(...args: Token[]): void {
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

    render(...args: Token[]): void {
        if (args.length) {
            const [{ body }] = args;

            if (typeof body === "string") {
                Deno.exit(parseInt(body));
            }
        }

        Deno.exit(0);
    }
}
