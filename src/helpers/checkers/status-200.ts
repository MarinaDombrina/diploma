import { RefinedResponse, ResponseType } from 'k6/http';
import { check } from 'k6';

export default function (response: RefinedResponse<ResponseType>) {
    return check(response, {
        'status is 200': (res) => {
            if (res.status === 200) {
                return true;
            } else {
                console.log('expected 200, got ' + res.status);
                return false;
            }
        },
    });
}