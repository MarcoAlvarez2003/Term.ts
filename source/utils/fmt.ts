export function formatRoute(route: string) {
    return route.length ? route.replaceAll("/", "\\") : "./";
}
