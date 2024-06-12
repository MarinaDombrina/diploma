import {TestChecker} from "@/abstracts/tests";

import buildPageFromFixture from '@/models/request-builders/site/build-page-from-fixture';
import buildPageByPath from '@/models/request-builders/site/build-page-by-path';
import exec from 'k6/execution';
import {sleep} from 'k6';
import http from 'k6/http';

export function buildTestByType(type: string, checkers: TestChecker[] = []) {
    return function() {
        const req = buildPageFromFixture(type);
        if (!req) {
            exec.test.abort('no urls provided');
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

export function buildTestByPage(urlPath: string, checkers: TestChecker[] = []) {
    return function() {
        const req = buildPageByPath(urlPath);
        if (!req) {
            exec.test.abort('no urls provided');
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
