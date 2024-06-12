import {Options, Scenario, Stage} from 'k6/options';
import Environment from '@/models/environment';
import AbstractOptionsBuilder from './abstract-options-builder';

export default class ScenarioOptionsBuilder extends AbstractOptionsBuilder {
    protected scenarios: {[key: string]: Scenario} = {};
    // @ts-ignore
    protected env: Environment;

    public constructor() {
        super();
        this.scenarios = {};
    }

    public build(additional: Options = {}): Options {
        const defaultData: Options = {scenarios: this.scenarios};
        return Object.assign(this.getDefaultOptions(), defaultData, additional);
    }

    public addScenario(scenario: Scenario, key: string = 'default'): ScenarioOptionsBuilder
    {
        this.scenarios[key] = scenario;
        return this;
    }

    public addRampingScenario(
        exec: string,
        key: string = 'ramping_vus_scenario',
        stages: Stage[] = [],
        startTime: string = '0s',
        startVUs: number = 1,
    ): ScenarioOptionsBuilder {
        if (!stages.length) {
            stages.push({
                target: 1,
                duration: '15s'
            });
        }

        const executor = 'ramping-vus';
        const gracefulRampDown = '1s';

        startVUs = Math.floor(startVUs);

        return this.addScenario({
            exec,
            startVUs,
            executor,
            startTime,
            stages,
            gracefulRampDown
        }, key);
    }
}
