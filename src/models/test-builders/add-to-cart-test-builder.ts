import {TestChecker} from "@/abstracts/tests";

import buildPostControllerRequest from '@/models/request-builders/api/build-post-controller-request';
import exec from 'k6/execution';
import { sleep } from 'k6';
import http from 'k6/http';
import {getOneRandom} from "@/helpers/data-helper";

export function buildAddSimpleToCart(checkers: TestChecker[] = []) {
    return function() {
        const productId = getOneRandom<number>([6]);

        const req = buildPostControllerRequest(`/checkout/cart/add/product/${productId}`, {
            product: productId,
            selected_configurable_option: '',
            related_product: '',
            item: productId,
            form_key: 'BauARWxjseQrAjrh',
            qty: 1
        });

        if (!req) {
            exec.test.abort('no product provided');
            return;
        }

        const res = http.request(
            req.method,
            req.endpoint,
            req.payload,
            req.params
        );
        checkers.forEach(checker => checker(res));
        sleep(0.5);
    }
}
