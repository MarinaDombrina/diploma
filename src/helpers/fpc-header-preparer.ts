import {RefinedParams, ResponseType} from 'k6/http';
import {randomizeBoolean} from "@/helpers/data-helper";
import Environment from "@/models/environment";

const env = Environment.getInstance();

export default (params: RefinedParams<ResponseType>): RefinedParams<ResponseType> => {
    const isCacheSkipping = randomizeBoolean(env.getCacheMissPercentage());
    if (!isCacheSkipping) {
        return params;
    }

    if (!params.headers) {
        params.headers = {};
    }

    params.headers['x-force-service'] = '1';

    return params;
};