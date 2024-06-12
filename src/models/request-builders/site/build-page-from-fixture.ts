import {RequestSettings} from '@/abstracts/request-settings';
import buildHeaders from '@/helpers/seo-headers-builder';
import FixtureProvider from '@/models/fixture-provider';
import {getOneRandom, makeRandomString, randomizeBoolean} from '@/helpers/data-helper';

import Environment from '../../environment';
const env = Environment.getInstance();

export default function(pageType: string, isNoRoute: boolean = false): RequestSettings|false {
    const urls = FixtureProvider.readFromJson<string>(env.getUrlsFile(), pageType)
    let endpoint = getOneRandom(urls);

    if (!urls || !urls.length) {
        return false;
    }

    if (isNoRoute) {
        endpoint += '12345';
    }

    const isCacheSkipping = randomizeBoolean(env.getCacheMissPercentage());
    if (isCacheSkipping) {
        endpoint += '?t=' + makeRandomString(5);
    }

    const method = 'GET';
    const payload = null;

    const params = buildHeaders(pageType);

    return {
        method,
        endpoint,
        payload,
        params,
    };
}