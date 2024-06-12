import { Options } from 'k6/options';

import checkStatus200 from '@/helpers/checkers/status-200';

import TestStagesBuilder from '@/models/stage-builders/test-stages-builder';
import ScenarioOptionsBuilder from '@/models/option-builders/scenario-options-builder';

import Environment from '../models/environment';
import {buildAddSimpleToCart} from "@/models/test-builders/add-to-cart-test-builder";
const env = Environment.getInstance();

const stagesBuilder = new TestStagesBuilder();

const MAX_CONCURRENT_PROCESSES = env.getMaxProcesses();

const optionsBuilder = new ScenarioOptionsBuilder();
optionsBuilder.setHighAvailable();

optionsBuilder.addRampingScenario(
    'testAddToCart',
    'AddToCart',
    stagesBuilder.build(MAX_CONCURRENT_PROCESSES),
    '1s',
    1
);
export let options: Options = optionsBuilder.build();

export const testAddToCart = buildAddSimpleToCart([checkStatus200]);
