import { Command } from "../../components/commander.ts";
import { Router } from "../../components/router.ts";
import { Token } from "../../components/parser.ts";
import { Input } from "../../components/input.ts";
import { join } from "../../imports/path.ts";
import { readKeypress } from "../../utils/keys.ts";
import { exist } from "../../utils/fs.ts";

export class Write implements Command {
    public target = /(create)/;

    constructor(private router: Router) {}

    async render(..._args: Token[]): Promise<void> {
        const type = await Input.select("what are you going to create", ["a file", "a folder"]);

        if (type) {
            switch (type) {
                case "a folder":
                    await this.createFolder(Input.prompt("Write the name of the folder"));
                    break;

                case "a file":
                    await this.createFile(Input.prompt("Write the file name"));
                    break;
            }
        }
    }

    async createFolder(name: string) {
        await Deno.mkdir(join(this.router.getCurrentRoute(), name));
    }

    async createFile(name: string) {
        const lines: string[] = [""];

        if (await exist(join(this.router.getCurrentRoute(), name))) {
            lines.length = 0;

            lines.push(
                ...(await Deno.readTextFile(join(this.router.getCurrentRoute(), name))).split("\n")
            );
        }

        lines.forEach((line, i) => {
            console.log(`${i}: ${line}`);
        });

        for await (const { key, ctrlKey, sequence } of readKeypress(Deno.stdin)) {
            console.clear();

            if (ctrlKey && key === "c") {
                console.log("...saving");
                break;
            }

            if (key === "backspace") {
                if (lines[lines.length - 1].length) {
                    lines[lines.length - 1] = lines[lines.length - 1]
                        .split("")
                        .slice(0, -1)
                        .join("");
                } else {
                    lines.pop();
                }

                if (lines.length === 0) {
                    lines.push("");
                }
            } else if (key === "return") {
                lines.push("");
            } else {
                lines[lines.length - 1] += sequence;
            }

            lines.forEach((line, i) => {
                console.log(`${i}: ${line}`);
            });
        }

        await Deno.writeTextFile(join(this.router.getCurrentRoute(), name), lines.join("\n"));
        console.clear();
    }
}
