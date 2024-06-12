//@ts-nocheck

export default class Log {
    static RESET = "\x1b[0m";

    static log(color = this.RESET, ...text) {
        console.log(color, ...text, this.RESET);
    }

    static emptyString() {
        this.default('');
    }

    static separatorBefore() {
        this.emptyString();
        this.separator();
    }

    static separatorAfter() {
        this.separator();
        this.emptyString();
    }

    static separator() {
        this.log(this.RESET + '----------');
    }

    static default(...text) {
        this.log(this.RESET, ...text);
    }

    static prepareForNesting(text) {
        return text
            .split('\n')
            .map(line => '\t' + line)
            .join('\n');
    }
}