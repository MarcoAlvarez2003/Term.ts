import { parse } from "../../imports/flags.ts";

interface Config {
    home: string;
    root: string;
    port: number;
}

function getRoot() {
    const root = parse(Deno.args).root;

    if (Deno.args.length === 1) {
        return Deno.args[0];
    }

    if (root) {
        return root;
    }

    return Deno.cwd();
}

function getPort() {
    const port = parse(Deno.args).port;

    if (port) {
        return parseInt(port);
    }

    const digits: string[] = [];

    for (let i = 0; i < 4; i++) {
        const digit = Math.floor(Math.random() * 8) + 1;
        digits.push(`${digit}`);
    }

    return parseInt(digits.join(""));
}

function getHome() {
    const home = parse(Deno.args).home;

    if (home) {
        return home;
    }

    return "index.html";
}

function getConfig(): Config {
    return {
        root: getRoot(),
        home: getHome(),
        port: getPort(),
    };
}

export { getConfig, getHome, getPort, getRoot };

export type { Config };
