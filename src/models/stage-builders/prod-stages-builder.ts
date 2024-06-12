import {Stage} from 'k6/options';

import AbstractStagesBuilder from './abstract-stages-builder';

export default class ProdStagesBuilder extends AbstractStagesBuilder {
    public build(maxProcesses: number = 100): Stage[] {
        maxProcesses = Math.floor(maxProcesses);

        return [
            { duration: '120s', target: Math.floor(maxProcesses / 2) },
            { duration: '300s', target: maxProcesses },
            { duration: '180s', target: Math.floor(maxProcesses / 2) },
        ];
    }
}
