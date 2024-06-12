export function getMultipleRandom<T>(data: Array<T>, num: number|null = null): Array<T> {
    const shuffled = [...data].sort(() => 0.5 - Math.random());

    if (!num) {
        num = randomizeNumberFromInterval(1, data.length);
    }

    return shuffled.slice(0, num);
}

export function getOneRandom<T>(data: Array<T>): T {
    return getMultipleRandom<T>(data, 1)[0];
}

export function randomizeNumberFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomizeBoolean(trueProbability: number = 50): boolean {
    if (!trueProbability) {
        return false;
    }
    return Math.random() < (trueProbability / 100);
}

export function makeRandomString(length: number, charset = ''): string {
    if (!charset) {
        charset = 'abcdefghijklmnopqrstuvwxyz';
    }

    let res = '';

    while (length--) {
        res += charset[(Math.random() * charset.length) | 0];
    }
    return res;
}

export function makeUuidV4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let random = Math.random() * 16 | 0;
        let v = c === 'x' ? random : (random & 0x3 | 0x8);
        return v.toString(16);
    });
}