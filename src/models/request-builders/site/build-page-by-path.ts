import {RequestSettings} from '@/abstracts/request-settings';
import buildHeaders from '@/helpers/seo-headers-builder';
import {makeRandomString, randomizeBoolean} from '@/helpers/data-helper';

import Environment from '../../environment';
const env = Environment.getInstance();

export default function(urlPath: string): RequestSettings|false {
    let endpoint = env.getSiteUrl() + urlPath;

    const isCacheSkipping = randomizeBoolean(env.getCacheMissPercentage());
    if (isCacheSkipping) {
        endpoint += '?t=' + makeRandomString(5);
    }

    const method = 'GET';
    const payload = null;

    const params = buildHeaders(urlPath);

    return {
        method,
        endpoint,
        payload,
        params,
    };
}