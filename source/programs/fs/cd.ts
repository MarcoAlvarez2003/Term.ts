import { Command } from "../../components/commander.ts";
import { Router } from "../../components/router.ts";
import { Token } from "../../components/parser.ts";

export class Cd implements Command {
    public target = /cd/;

    constructor(private router: Router) {}

    async render(...args: Token[]): Promise<void> {
        if (args.length) {
            const [route] = args;

            if (typeof route.body === "string") {
                await this.router.goto(route.body);

                console.log();
            }
        }
    }
}
