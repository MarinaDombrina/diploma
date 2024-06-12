import { SharedArray } from 'k6/data';

export default class FixtureProvider {
    protected static files: {[key: string]: any} = {};
    protected static fixtures: {[key: string]: any} = {};

    public static readFromJson<T>(fileName: string, field: string|null = null): T[] {
        const key = fileName + (field ? `-${field}` : '');

        if (!FixtureProvider.fixtures.hasOwnProperty(key)) {
            FixtureProvider.fixtures[key] = new SharedArray(key, (): T[] => {
                const data = FixtureProvider.readJsonFile(fileName);
                const result = field ? data[field] : data;
                return result || [];
            });
        }

        return FixtureProvider.fixtures[key];
    }


    protected static readJsonFile(fileName: string) {
        if (!FixtureProvider.files.hasOwnProperty(fileName)) {
            FixtureProvider.files[fileName] = JSON.parse(open(FixtureProvider.getFilePath(fileName))) || {};
        }

        return FixtureProvider.files[fileName];
    }

    protected static getFilePath(fileName: string): string {
        return '../fixtures/' + fileName;
    }
}
