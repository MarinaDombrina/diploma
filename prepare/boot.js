import { fileURLToPath } from 'url';
import { dirname } from 'path';
import FileManager from './service/file-manager.js';

const __currentFileName = fileURLToPath(import.meta.url);

export default function boot() {
    const fileManager = new FileManager();
    fileManager.initRootDir(dirname(dirname(__currentFileName)));
}