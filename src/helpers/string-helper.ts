export function trimSlashes(str: string): string {
    return str.replace(/^\/|\/$/g, '');
}