import { RefinedResponse, ResponseType } from 'k6/http';
import { check } from 'k6';

export default function (response: RefinedResponse<ResponseType>) {
    return check(
        response,
        {
            'has data field': (res) => {
                return (res.json() || {}).hasOwnProperty('data');
            },
        });
}