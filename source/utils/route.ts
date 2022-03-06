export interface Route {
    isAbsolute: boolean;
    folders: string[];
}

export function getRoute(route: string) {
    const _route: Route = {
        isAbsolute: false,
        folders: [""],
    };

    for (let i = 0; i < route.length; i++) {
        const current = route[i];

        if (current === "." && i === 0) {
            if (i + 1 < route.length) {
                const next = route[i + 1];

                if (next === "\\") {
                    _route.isAbsolute = false;
                    i++;

                    continue;
                }
            }
        }

        if (current === "\\") {
            if (i === 0) {
                _route.isAbsolute = true;
            } else {
                _route.folders.push("");
            }

            continue;
        }

        const index = _route.folders.length - 1;
        const exist = _route.folders[index];

        if (exist) {
            _route.folders[index] += current;
        } else {
            _route.folders[index] = current;
        }
    }

    return _route;
}
