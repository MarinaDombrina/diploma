import {Stage} from 'k6/options';

import AbstractStagesBuilder from './abstract-stages-builder';

export default class TestStagesBuilder extends AbstractStagesBuilder {
    public build(maxProcesses: number = 10): Stage[] {
        maxProcesses = Math.floor(maxProcesses);

        return [
            { duration: '20s', target: maxProcesses },
            { duration: '10s', target: maxProcesses },
            { duration: '30s', target: Math.floor(maxProcesses / 2) },
        ];
    }
}
