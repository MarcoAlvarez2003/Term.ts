import { exist } from "../utils/fs.ts";

export class MemoryStorage {
    protected storage: Record<string, unknown>;

    constructor(protected path: string, _default: Record<string, unknown> = {}) {
        this.storage = _default;
    }

    public async load() {
        if (await exist(this.path)) {
            this.storage = JSON.parse(await Deno.readTextFile(this.path));
        } else {
            await this.save();
        }

        return this;
    }

    public async save() {
        await Deno.writeTextFile(this.path, JSON.stringify(this.storage));

        return this;
    }

    public get<Type>(name: string) {
        return this.storage[name] as Type;
    }

    public set<Type>(name: string, value: Type) {
        this.storage[name] = value;

        return this;
    }
}
