import {RefinedParams, ResponseType} from 'k6/http';

export interface RequestSettings {
    method: string,
    endpoint: string,
    payload: string | null,
    params: RefinedParams<ResponseType>
}
