import { parse } from "../imports/flags.ts";

function getFlag<DefaultValue>(name: string, _default: DefaultValue): DefaultValue {
    const flags = parse(Deno.args);

    if (name in flags) {
        return flags[name];
    }

    return _default;
}

export { getFlag };
