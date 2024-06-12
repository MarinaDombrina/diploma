import {RequestSettings} from '@/abstracts/request-settings';
import buildHeaders from '@/helpers/seo-headers-builder';

import Environment from '../../environment';
const env = Environment.getInstance();

export default function(urlPath: string, payload: any): RequestSettings|false {
    let endpoint = env.getSiteUrl() + urlPath;

    const method = 'POST';

    let params = buildHeaders(urlPath);
    params.headers = params.headers || {};
    params.headers['Cookie'] = 'PHPSESSID=lsaj7vqqebi1usfq8hpppupg7h';

    return {
        method,
        endpoint,
        payload,
        params,
    };
}