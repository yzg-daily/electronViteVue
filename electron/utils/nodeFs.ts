import fs from 'node:fs/promises';
import path from 'node:path' // path 可能会有命名冲突问题
import {app} from 'electron'
import {ResCodeEnum} from '../../types/enum'

const dataDirectory =  (filePath:string) => path.join(app.getPath('userData'), filePath);

export async function readyFile(filePath: string = '/'): Promise<Res<string>> {
    if (!filePath) throw new Error('Invalid file path');
    try {
        const res = await fs.readFile(dataDirectory(filePath), 'utf8');
        return {
            code: ResCodeEnum.Ok,
            data: res
        }
    } catch (e) {
        return {
            code: ResCodeEnum.File,
            data: undefined,
            msg: `File not found (dataDirectory(filePath)), ${e.message}`
        }
    }
}

export async function saveFile(filePath: string = '/', fileContent = '', options = {}): Promise<Res<string>> {
    if (!filePath) throw new Error('Invalid file path');
    if (typeof fileContent !== 'string') throw new Error('File content must be a string');

    try {
        // 获取文件目录
        const directory = path.dirname(filePath);
        // 如何没有就新建一个
        await fs.mkdir(directory, { recursive: true });
        // const filename = path.basename(filePath);
        // const isHasFile = await fs.access(filePath, fs.constants.F_OK);
        // console.log(isHasFile, 'isHasFile');
        // if (!isHasFile) {
        //     console.log(`${filename} file does not exist`);
        // }
        // let allFileUrl = dataDirectory(filePath)
        // fs.access(allFileUrl, fs.constants.F_OK).then(res => {
        //     console.log(res, 'fs.access(filePath, fs.constants.F_OK)');
        // })
        // 写入文件
        await fs.writeFile(dataDirectory(filePath), fileContent, {
            encoding: 'utf8',
            ...options
        });
        return {
            code: ResCodeEnum.Ok,
            msg: 'File saved successfully!'
        }
    } catch (err) {
        return {
            code: ResCodeEnum.File,
            msg: `Error saving file: ${err.message}`
        }
    }
}
