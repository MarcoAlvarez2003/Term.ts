import { Command } from "../../components/commander.ts";
import { magenta, bold } from "../../imports/colors.ts";
import { sentenceCase } from "../../imports/case.ts";
import { Router } from "../../components/router.ts";
import { Token } from "../../components/parser.ts";

export class Show implements Command {
    public target = /show/;

    constructor(private router: Router) {}

    render(...args: Token[]): void {
        if (args.length) {
            const [{ body }] = args;

            if (typeof body === "string") {
                switch (body) {
                    case "folder":
                        return console.log(magenta(this.router.getCurrentFolder()), "\n");

                    case "route":
                        return console.log(magenta(this.router.getCurrentRoute()), "\n");

                    case "disk":
                        return console.log(magenta(this.router.getCurrentDisk()), "\n");

                    case "user":
                        return console.log(
                            magenta(sentenceCase(this.router.getCurrentUser())),
                            "\n"
                        );

                    default:
                        return;
                }
            }
        }

        console.log(bold("Route:"), magenta(this.router.getCurrentRoute()), "\n");
        console.log(bold("Folder"), magenta(this.router.getCurrentFolder()));
        console.log(bold("User"), magenta(this.router.getCurrentUser()));
        console.log(bold("Disk"), magenta(this.router.getCurrentDisk()));
        console.log();
    }
}
