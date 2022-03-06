export type DepthArray<Type> = Type | DepthArray<Type>[];

export interface Token {
    type: "Command" | "String" | "Array";
    body: string | DepthArray<string>[];
}

export class Parser {
    private letters: string[] = [];
    private tokens: Token[] = [];
    private index = 0;

    constructor(private source: string) {
        for (; this.index < source.length; this.index++) {
            if (this.current === '"' || this.current === "'") {
                this.createWord();

                this.tokens.push({
                    type: "String",
                    body: this.createString(),
                });

                continue;
            }

            if (this.current === " ") {
                this.createWord();
                continue;
            }

            if (this.current === "[") {
                this.createWord();

                this.tokens.push({
                    type: "Array",
                    body: this.createArray(),
                });

                continue;
            }

            this.letters.push(this.current);
        }

        this.createWord();
    }

    public getTokensFound() {
        return this.tokens;
    }

    private createArray() {
        const elements: DepthArray<string> = [""];
        this.index++;

        for (; this.index < this.source.length; this.index++) {
            if (this.current === '"' || this.current === "'") {
                elements.push(this.createString());
                continue;
            }

            if (this.current === "[") {
                elements.push(this.createArray());
                continue;
            }

            if (this.current === "]") {
                break;
            }

            if (this.current === ",") {
                elements.push("");

                continue;
            }

            if (this.current === " ") {
                continue;
            }

            const index = elements.length - 1;
            elements[index] += this.current;
        }

        return elements.filter((element) => element !== "");
    }

    private createString() {
        const initializer = this.current;
        const letters: string[] = [];
        this.index++;

        for (; this.index < this.source.length; this.index++) {
            if (this.current === initializer) {
                break;
            }

            if (this.current === "\\") {
                this.index;
            }

            letters.push(this.current);
        }

        const word = letters.join("");

        return word;
    }

    private createWord() {
        if (this.letters.join("").trim().length) {
            const word = this.letters.join("").trim();

            this.tokens.push({
                type: "Command",
                body: word,
            });

            this.letters.length = 0;
        }
    }

    private get current() {
        return this.source[this.index];
    }
}
