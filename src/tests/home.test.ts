import { Options } from 'k6/options';

import checkStatus200 from '@/helpers/checkers/status-200';

import { buildTestByPage } from '@/models/test-builders/page-test-builder';
import TestStagesBuilder from '@/models/stage-builders/test-stages-builder';
import ScenarioOptionsBuilder from '@/models/option-builders/scenario-options-builder';

import Environment from '../models/environment';
const env = Environment.getInstance();

const stagesBuilder = new TestStagesBuilder();

const MAX_CONCURRENT_PROCESSES = env.getMaxProcesses();

const optionsBuilder = new ScenarioOptionsBuilder();
optionsBuilder.setHighAvailable();

optionsBuilder.addRampingScenario(
    'testHome',
    'HomePage',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES),
    '1s',
    1
);
export let options: Options = optionsBuilder.build();

export const testHome = buildTestByPage('/', [checkStatus200]);
