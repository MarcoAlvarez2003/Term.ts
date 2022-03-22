async function exist(path: string): Promise<boolean> {
    try {
        await Deno.stat(path);

        return true;
    } catch (_) {
        return false;
    }
}

export { exist };
