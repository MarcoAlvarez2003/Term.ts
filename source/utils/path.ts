interface Path {
    private: string[];
    public: string[];
    route: string;
    name: string;
    disk: string;
}

function getPath(): Path {
    const route = Deno.cwd();

    const [disk, users, name, ...others] = route.split("\\");

    return {
        private: [disk, users, name],
        public: [...others],
        route,
        disk,
        name,
    };
}

export { getPath };
export type { Path };
