async function exist(path: string) {
    try {
        await Deno.stat(path);

        return true;
    } catch (_) {
        return false;
    }
}

export { exist };
