import {RefinedResponse, ResponseType} from 'k6/http';

export type TestChecker = (response: RefinedResponse<ResponseType>) => boolean;