import { bold, magenta, green, red } from "../../imports/colors.ts";
import { Folder, FileSystem, File } from "../../components/fs.ts";
import { Command } from "../../components/commander.ts";
import { Token } from "../../components/parser.ts";
import { join } from "../../imports/path.ts";
import { Router } from "../../components/router.ts";

export class Read implements Command {
    public target = /read/;

    constructor(private router: Router) {}

    public async render(...args: Token[]): Promise<void> {
        if (args.length) {
            const [{ body: file }] = args;

            if (typeof file === "string") {
                const data = await FileSystem.getFile(join(this.router.getCurrentRoute(), file));

                if (data) {
                    this.showFile(data);
                } else {
                    this.nonExist(file);
                }
            }
        } else {
            const data = await FileSystem.getFolderContent(this.router.getCurrentRoute());

            if (data) {
                this.showFolder(data);
            }
        }
    }

    private showFile({ extension, name, body }: File) {
        console.log();
        console.log(`${bold("File Extension")}: ${green(extension)}`);
        console.log(`${bold("File Name")}: ${green(name)}`);
        console.log(bold(`\n${body}`));
        console.log();
    }

    private showFolder({ name, folders, files }: Folder) {
        console.log();
        console.log(`${bold("Folder Name")}: ${magenta(name)}`);
        console.log();

        console.log(`${bold("Folders")}: ${green(`${folders.length}`)}`);

        for (const folder of folders) {
            console.log(`\t${magenta(folder.name)}`);
        }

        console.log(`${bold("Files")}: ${green(`${files.length}`)}`);

        for (const file of files) {
            console.log(`\t${magenta(file.name)}`);
        }

        console.log();
    }

    private nonExist(name: string) {
        console.log(
            `The ${red("file")} ${magenta(name)} does not exist in ${bold(
                this.router.getCurrentRoute()
            )}`
        );

        console.log();
    }
}
