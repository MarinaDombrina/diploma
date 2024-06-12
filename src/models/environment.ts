import type {EnvironmentData} from '@/abstracts/environment';
import {StagesType} from '@/abstracts/environment';

export default class Environment {
    private static instance: Environment;

    private readonly envData: EnvironmentData;
    private readonly envSettings: {[p: string]: string};

    private constructor() {
        this.envSettings = __ENV || {};

        this.envData = {
            siteUrl: this.envSettings.SITE_URL || '',
            siteBearer: this.envSettings.SITE_BEARER || '',

            maxProcesses: +this.envSettings.MAX_PROCESSES || 0,
            cacheMiss: +this.envSettings.CACHE_MISS || 0,
            stagesType: this.envSettings.STAGES_TYPE || StagesType.test,

            urlsFile: this.envSettings.URLS_FILE || '',

            debugMode: +this.envSettings.DEBUG_MODE || 0,
        };
    }


    public static getInstance(): Environment {
        if (!this.instance) {
            this.instance = new this();
        }

        return this.instance;
    }

    public getSiteUrl(): string {
        return this.envData.siteUrl || '';
    }

    public getSiteBearer(): string {
        return this.envData.siteBearer || '';
    }

    public getUrlsFile(): string {
        return this.envData.urlsFile || '';
    }

    public isDebugMode(): boolean {
        return !!(this.envData.debugMode);
    }

    public getCacheMissPercentage(): number {
        return this.envData.cacheMiss;
    }

    public getMaxProcesses(): number {
        return this.envData.maxProcesses;
    }

    public getStagesType(): StagesType {
        return (this.envData.stagesType.toUpperCase() as StagesType); // @todo check types and use "never"
    }

    public isTestStages(): boolean {
        return this.getStagesType().toUpperCase() === StagesType.test;
    }

    public isProdStages(): boolean {
        return this.getStagesType().toUpperCase() === StagesType.prod;
    }
}
