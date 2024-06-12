//@ts-nocheck

import fs from 'fs';

let rootDir = '';

export default class FileManager {
    isExist(fileName) {
        return fs.existsSync(fileName);
    }

    write(fileName, text) {
        return fs.writeFileSync(fileName, text);
    }

    read(fileName) {
        return fs.readFileSync(fileName).toString();
    }

    createReadStream(fileName) {
        return fs.createReadStream(fileName);
    }

    remove(fileName) {
        return fs.rmSync(fileName);
    }

    copy(orig, dest) {
        return fs.copyFileSync(orig, dest);
    }

    initRootDir(dir) {
        rootDir = dir;
    }

    getRootDir() {
        return rootDir;
    }
}
