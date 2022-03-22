export function formatRoute(route: string) {
    return route.length ? route.replaceAll("/", "\\") : "./";
}

export function Capitalize(text: string) {
    const [first, ...letters] = text.split("");

    return [first.toUpperCase(), ...letters.map((letter) => letter.toLocaleLowerCase())].join("");
}
