import Environment from '@/models/environment';
import AbstractStagesBuilder from '@/models/stage-builders/abstract-stages-builder';
import TestStagesBuilder from '@/models/stage-builders/test-stages-builder';
import ProdStagesBuilder from '@/models/stage-builders/prod-stages-builder';

const env = Environment.getInstance();
export default class StagesBuilderProvider {
    public static getBuilder(): AbstractStagesBuilder {
        return env.isProdStages() ? (new ProdStagesBuilder()) : (new TestStagesBuilder());
    }
}
