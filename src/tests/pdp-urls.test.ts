import { Options } from 'k6/options';

import checkStatus200 from '@/helpers/checkers/status-200';

import { buildTestByType } from '@/models/test-builders/page-test-builder';
import TestStagesBuilder from '@/models/stage-builders/test-stages-builder';
import ScenarioOptionsBuilder from '@/models/option-builders/scenario-options-builder';

import FixtureProvider from '@/models/fixture-provider';

import Environment from '../models/environment';
const env = Environment.getInstance();

FixtureProvider.readFromJson(env.getUrlsFile(), 'products');


const stagesBuilder = new TestStagesBuilder();

const MAX_CONCURRENT_PROCESSES = env.getMaxProcesses();

const optionsBuilder = new ScenarioOptionsBuilder();
optionsBuilder.setHighAvailable();

optionsBuilder.addRampingScenario(
    'testProducts',
    'ProductPage',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES),
    '1s',
    1
);
export let options: Options = optionsBuilder.build();

export const testProducts = buildTestByType('products', [checkStatus200]);
