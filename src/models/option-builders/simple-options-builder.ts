import {Options} from 'k6/options';
import AbstractOptionsBuilder from './abstract-options-builder';

export default class SimpleOptionsBuilder extends AbstractOptionsBuilder {
    protected processQty: number;
    protected seconds: number;
    protected scenarios: {}|null = null;

    public constructor(processQty: number, seconds: number) {
        super();
        this.processQty = processQty;
        this.seconds = seconds;
    }

    public build(additional: Options = {}): Options {
        const defaultData: Options = {
            vus: this.processQty,
            duration: `${this.seconds}s`,
        };

        return Object.assign(this.getDefaultOptions(), defaultData, additional);
    }
}
