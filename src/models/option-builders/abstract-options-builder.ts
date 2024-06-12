import Environment from '@/models/environment';
import {Options, Threshold} from "k6/options";

export default abstract class AbstractOptionsBuilder {
    protected env: Environment|null = null;
    protected thresholds: { [name: string]: Threshold[] } | null = null;

    // @ts-ignore
    abstract build(additional: Options = {}): Options;

    /**
     * @param maxDuration Max duration in ms for 99 percentile
     * @protected
     */
    public setHighAvailable(maxDuration: number = 1000): AbstractOptionsBuilder {
        this.thresholds = {
            http_req_failed: ['rate < 0.001'],
            http_req_duration: [`p(99) < ${maxDuration}`],
        };
        return this;
    }

    protected getDefaultOptions(): Options {
        const defaultData: Options = {};

        if (this.getEnv().isDebugMode()) {
            defaultData.httpDebug = 'full';
        }

        if (this.thresholds) {
            defaultData.thresholds = this.thresholds;
        }

        return defaultData;
    }

    protected getEnv() {
        if (!this.env) {
            this.env = Environment.getInstance();
        }
        return this.env;
    }
}
