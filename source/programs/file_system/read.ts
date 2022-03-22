import { Folder, FileSystem, File, Stat } from "../../components/fs.ts";
import { bold, magenta, red } from "../../imports/colors.ts";
import { Command } from "../../components/commander.ts";
import { Token } from "../../components/parser.ts";
import { Router } from "../../components/router.ts";

export interface ReadConfig {
    canReadEachFolder: boolean;
    canReadEachFile: boolean;
    waitForEachFile: boolean;
    hasTargetFile: boolean;
    targets: string[];
}

export class Read implements Command {
    private router = Router.instance;
    public target = /read/;

    private parseArgs(args: Token[]): ReadConfig {
        let canReadEachFolder = false;
        let canReadEachFile = false;
        let waitForEachFile = false;
        let hasTargetFile = false;
        const targets: string[] = [];

        if (args.length >= 1) {
            for (const { body } of args) {
                if (typeof body === "string") {
                    switch (body) {
                        case "each":
                            canReadEachFolder = true;
                            break;
                        case "file":
                            canReadEachFile = true;
                            break;
                        case "slowly":
                        case "wait":
                            waitForEachFile = true;
                            break;
                        default:
                            hasTargetFile = true;
                            targets.push(body);
                            break;
                    }
                }
            }
        }

        return {
            canReadEachFolder,
            canReadEachFile,
            waitForEachFile,
            hasTargetFile,
            targets,
        };
    }

    public async render(...args: Token[]): Promise<void> {
        const config = this.parseArgs(args);

        if (config.hasTargetFile) {
            for (const target of config.targets) {
                const file = await FileSystem.getFile(target);

                if (file) {
                    this.showFile(file);
                } else {
                    this.nonExist(target);
                }
            }
        } else {
            const folder = await FileSystem.getFolderContent(this.router.getCurrentRoute());

            if (folder) {
                await this._showFolder(config, folder);
            }
        }
    }

    private showStat({ extension, name, path, size }: Stat, _tab = "") {
        console.log(`${_tab}\t${bold("File Extension")}: ${magenta(extension)}`);
        console.log(`${_tab}\t${bold("File Size")}: ${magenta(`${size}`)}`);
        console.log(`${_tab}\t${bold("File Name")}: ${magenta(name)}`);
        console.log(`${_tab}\t${bold("File Path")}: ${magenta(path)}`);
    }

    private showFile(file: File, tab = "") {
        const body = magenta(`\n\t${file.body.replaceAll("\n", `\n${tab}\t`)}`);
        this.showStat(file, tab);
        console.log(body);
    }

    private log(message: string) {
        console.log(`${message}`);
    }

    private async _showFolder(config: ReadConfig, folder: Folder, tab = "") {
        this.log(`${tab}${bold("Main Folder")}: ${bold(magenta(folder.name))}`);

        for (const _folder of folder.folders) {
            if (config.canReadEachFolder) {
                await this._showFolder(config, _folder, `${tab}\t`);
            } else {
                this.log(`\t${bold("Sub Folder")}: ${magenta(_folder.name)}`);
            }
        }

        for (const stat of folder.files) {
            if (config.canReadEachFile) {
                const file = await FileSystem.getFile(stat.path);

                if (file) {
                    if (config.waitForEachFile) {
                        prompt(`Press enter for see ${stat.name}`);
                    }

                    this.showFile(file, tab);
                }
            } else {
                this.showStat(stat, tab);
            }
        }
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
