import { readKeypress } from "../utils/keys.ts";

export class Input {
    public static prompt(message: string) {
        return prompt(message) ?? "";
    }

    public static async select<Type>(message: string, choices: Type[]) {
        Input.printMessage(message);

        let index = 0;

        Input.printChoice(index, choices);

        for await (const key of readKeypress(Deno.stdin)) {
            Input.printMessage(message);

            if (key.key === "c" && key.ctrlKey) {
                return null;
            }

            if (key.key === "return") {
                break;
            }

            if (key.key === "w") {
                index--;
            }

            if (key.key === "s") {
                index++;
            }

            if (index >= choices.length) {
                index = 0;
            }

            if (index < 0) {
                index = choices.length - 1;
            }

            Input.printChoice(index, choices);
        }

        return choices[index];
    }

    private static printMessage(message: string) {
        console.clear();
        console.log(message);
    }

    private static printChoice<Type>(index: number, choices: Type[]) {
        console.log(
            choices
                .map((choice, i) => {
                    if (i === index) {
                        return `(*) ${choice}`;
                    }

                    return `( ) ${choice}`;
                })
                .join("\n")
        );
    }
}
