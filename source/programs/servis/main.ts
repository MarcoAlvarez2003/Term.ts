import { Router } from "../../components/router.ts";
import { runServis } from "./index.ts";
import { getPort } from "./config.ts";

export class Servis {
    public target = /servis/;

    constructor(private router: Router) {}

    public async render() {
        if (confirm("Are you sure, if you close the server you also close the terminal")) {
            await runServis({
                home: "index.html",
                port: getPort(),
                root: this.router.getCurrentRoute(),
            });
        }
    }
}
