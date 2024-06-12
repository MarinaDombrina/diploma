import Environment from '@/models/environment';
import {Stage} from "k6/options";

export default abstract class AbstractStagesBuilder {
    protected env: Environment|null = null;

    abstract build(maxProcesses: number): Stage[];

    protected getEnv() {
        if (!this.env) {
            this.env = Environment.getInstance();
        }
        return this.env;
    }
}
