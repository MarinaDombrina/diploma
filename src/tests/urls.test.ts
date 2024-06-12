import { Options } from 'k6/options';

import checkStatus200 from '@/helpers/checkers/status-200';
import checkStatus404 from '@/helpers/checkers/status-404';

import { buildTestByType } from '@/models/test-builders/page-test-builder';
import TestStagesBuilder from '@/models/stage-builders/test-stages-builder';
import ScenarioOptionsBuilder from '@/models/option-builders/scenario-options-builder';

import FixtureProvider from '@/models/fixture-provider';

import Environment from '../models/environment';
const env = Environment.getInstance();

let urlTypes = [
    'categories',
    'products',
    'cms',
    '404',
];
urlTypes.forEach((urlType) => {
    const data = FixtureProvider.readFromJson(env.getUrlsFile(), urlType);
    if (!data.length) {
        urlTypes = urlTypes.filter(item => item !== urlType);
    }
});

const stagesBuilder = new TestStagesBuilder();

const MAX_CONCURRENT_PROCESSES = env.getMaxProcesses();

const optionsBuilder = new ScenarioOptionsBuilder();

optionsBuilder.addRampingScenario(
    'testProducts',
    'ProductPage',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES),
    '2s',
    1
);
optionsBuilder.addRampingScenario(
    'testCategories',
    'CategoryPage',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES),
    '3s',
    5
);
optionsBuilder.addRampingScenario(
    'testCms',
    'CmsPage',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES * 0.2),
    '5s',
    1
);

optionsBuilder.addRampingScenario(
    'test404',
    'Page404',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES * 0.1),
    '10s',
    1
);

export const options: Options = optionsBuilder.build();

export const testProducts = buildTestByType('products', [checkStatus200]);
export const testCategories = buildTestByType('categories', [checkStatus200]);
export const testCms = buildTestByType('cms', [checkStatus200]);
export const test404 = buildTestByType('404',[checkStatus404]);
