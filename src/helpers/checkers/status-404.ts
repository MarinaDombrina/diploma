import { RefinedResponse, ResponseType } from 'k6/http';
import { check } from 'k6';
export default function (response: RefinedResponse<ResponseType>) {
    return check(response, {
        'status is 404': (res) => {
            if (res.status === 404) {
                return true;
            } else {
                console.log('expected 404, got ' + res.status);
                return false;
            }
        },
    });
}