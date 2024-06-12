import {RefinedParams, ResponseType} from 'k6/http';

export default (name: string): RefinedParams<ResponseType> => {
    return {
        headers: {
            'Accept-Encoding': 'gzip',
        },
        tags: Object.assign({}, {name}, {tag: 'seo'}),
    }
};