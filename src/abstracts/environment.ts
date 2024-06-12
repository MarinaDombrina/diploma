export interface EnvironmentData {
    siteUrl: string;
    siteBearer: string;

    maxProcesses: number;
    cacheMiss: number;
    stagesType: string;

    urlsFile: string;

    debugMode: number;
}

export enum StagesType {
    test = 'TEST',
    prod = 'PROD',
}
