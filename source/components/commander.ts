import { Parser, Token } from "./parser.ts";
import { Input } from "./input.ts";

export interface Command {
    render(...args: Token[]): void | Promise<void>;
    target: RegExp;
}

export class Commander {
    constructor(private commands: Command[]) {}

    public async start(message: string) {
        const tokens = new Parser(Input.prompt(message)).getTokensFound();
        const orders: Token[][] = [[]];

        for (const token of tokens) {
            if (token.type === "Command" && token.body === "&") {
                orders.push([]);
            } else {
                orders[orders.length - 1].push(token);
            }
        }

        for (const order of orders) {
            if (order.length) {
                const [{ type, body }, ...args] = order;

                for (const command of this.commands) {
                    const target = command.target;

                    if (typeof body === "string" && type === "Command") {
                        if (target.test(body)) {
                            await command.render(...args);
                        }
                    }
                }
            }
        }
    }
}
