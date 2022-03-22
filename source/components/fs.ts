import { basename, join, extname } from "../imports/path.ts";
import { exist } from "../utils/fs.ts";

export interface Folder {
    folders: Folder[];
    files: Stat[];
    name: string;
}

export interface Stat {
    extension: string;
    name: string;
    size: number;
    path: string;
}
export interface File extends Stat {
    body: string;
}

export class FileSystem {
    public static async getFolderContent(route: string): Promise<Folder | undefined> {
        if (await exist(route)) {
            const name = basename(route);

            const folder: Folder = {
                folders: [],
                files: [],
                name,
            };

            for await (const entry of Deno.readDir(route)) {
                const path = join(route, entry.name);

                if (entry.isDirectory) {
                    const _folder = await FileSystem.getFolderContent(path);

                    if (_folder) {
                        folder.folders.push(_folder);
                    }
                } else {
                    const stat = await FileSystem.getStat(path);

                    if (stat) {
                        folder.files.push(stat);
                    }
                }
            }

            return folder;
        }
    }

    public static async getStat(route: string): Promise<Stat | undefined> {
        if (await exist(route)) {
            const stat = await Deno.stat(route);

            return {
                extension: extname(route),
                name: basename(route),
                size: stat.size,
                path: route,
            };
        }
    }

    public static async getFile(route: string): Promise<File | undefined> {
        if (await exist(route)) {
            const stat = await FileSystem.getStat(route);
            const body = await Deno.readTextFile(route);

            if (stat) {
                return {
                    body,
                    ...stat,
                };
            }
        }
    }
}
