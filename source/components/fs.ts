import { basename, join, extname } from "../imports/path.ts";
import { exist } from "../utils/fs.ts";

export interface Folder {
    folders: Folder[];
    files: File[];
    name: string;
}

export interface File {
    extension: string;
    name: string;
    body: string;
}

export class FileSystem {
    public static async getFolderContent(route: string) {
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
                    const file = await FileSystem.getFile(path);

                    if (file) {
                        folder.files.push(file);
                    }
                }
            }

            return folder;
        }
    }

    public static async getFile(route: string) {
        if (await exist(route)) {
            const body = await Deno.readTextFile(route);
            const name = basename(route);

            return {
                name,
                body,
                extension: extname(route),
            };
        }
    }
}
