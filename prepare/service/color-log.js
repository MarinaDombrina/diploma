
//@ts-nocheck
import Log from './log.js';

export default class ColorLog extends Log {
    static RED = '\x1b[31m';
    static GREEN = '\x1b[32m';
    static YELLOW = '\x1b[33m';
    static BLUE = '\x1b[34m';
    static MAGENTA = '\x1b[35m';
    static CYAN = '\x1b[36m';
    static WHITE = '\x1b[37m';

    static BG_BLACK = '\x1b[40m';
    static BG_RED = '\x1b[41m';
    static BG_GREEN = '\x1b[42m';
    static BG_YELLOW = '\x1b[43m';
    static BG_BLUE = '\x1b[44m';
    static BG_MAGENTA = '\x1b[45m';
    static BG_CYAN = '\x1b[46m';
    static BG_WHITE = '\x1b[47m';

    static highlight(color = this.RESET, text) {
        return color + text + this.RESET;
    }

    static error(...text) {
        this.log(this.RED, ...text);
    }

    static errorText(text) {
        return this.highlight(this.RED, text);
    }

    static success(...text) {
        this.log(this.GREEN, ...text);
    }

    static successText(text) {
        return this.highlight(this.GREEN, text);
    }

    static warning(...text) {
        this.log(this.YELLOW, ...text);
    }

    static warningText(text) {
        return this.highlight(this.YELLOW, text);
    }

    static info(...text) {
        this.log(this.CYAN, ...text);
    }

    static infoText(text) {
        return this.highlight(this.CYAN, text);
    }

    static infoSecondary(...text) {
        this.log(this.MAGENTA, ...text);
    }

    static infoSecondaryText(text) {
        return this.highlight(this.MAGENTA, text);
    }
}
