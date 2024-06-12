function buildParamParser(pattern) {
    return item => item.startsWith(pattern)
}

export default class CliHandler {
    constructor(args) {
        this.args = args;
    }

    parseParam(param) {
        const args = this.args;
        const pattern = `--${param}=`;

        const finder = buildParamParser(pattern);
        const neededParam = args.find(finder);

        return neededParam ? neededParam.replace(pattern, '') : '';
    }
}
