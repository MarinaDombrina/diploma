//@ts-nocheck

import path from 'path';
import FileManager from './file-manager.js';
import { PROJECT_DIRECTORIES } from '../const/dirs.js';

export const DEFAULT_REPORT_FILE = 'index.html';

export default class ReportManager {
    constructor() {
        this.fileManager = new FileManager();
    }

    getReportFile(fileName) {
        const dir = PROJECT_DIRECTORIES.reports;

        if (!fileName) {
            fileName = DEFAULT_REPORT_FILE;
        }
        fileName = fileName.replace(dir + '/', '');

        return path.join(this.fileManager.getRootDir(), dir, fileName);
    }

}
