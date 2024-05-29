import {app, ipcMain, nativeImage} from 'electron'
import {isMac} from "../../utils";
import {exec,execSync} from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import {saveFile, readyFile} from '../../utils/nodeFs'


app.whenReady().then(() => {
    ipcMain.handle('qy:saveFile', async (event, data) => {
        const {filePath, content} = data;
        return await saveFile(filePath, content)
    })
    ipcMain.handle('qy:readyFile', async (event, filePath) => {

        return await readyFile(filePath)
    })
})
// Windows 用户的开始菜单目录
const startMenuPath = path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu');

// 桌面目录
const desktopPath = path.join(process.env.USERPROFILE, 'Desktop');

function readShortcutFiles(directory) {
    try {
        const files = fs.readdirSync(directory);
        const shortcuts = files.filter(file => path.extname(file).toLowerCase() === '.lnk');
        return shortcuts.map(shortcut => path.join(directory, shortcut));
    } catch (error) {
        console.error('读取快捷方式文件出错:', error);
        return [];
    }
}

// 读取开始菜单和桌面中的快捷方式
const startMenuShortcuts = readShortcutFiles(startMenuPath);
const desktopShortcuts = readShortcutFiles(desktopPath);
const a = readShortcutFiles("D:\\快捷方式")
const documents = readShortcutFiles(app.getPath("documents"));
// console.log(documents);
// console.log(app.getPath("documents"), 'app.getPath("documents")');
// console.log(startMenuShortcuts);
// console.log(desktopShortcuts);


// const data = desktopShortcuts.map(el => fs.statSync(el));
// console.log(data);

ipcMain.on('get:computer:registry', (event ) => {
    // const code = isMac ? 'system_profiler SPApplicationsDataType' : 'wmic product get name'
    //
    // const res = exec(code)
    // console.log(res.stdout);
    // const softwareList = res.stdout?.split('\n').slice(1).filter(Boolean).map(line => line.trim());
    // exec(code, (error, stdout, stderr) => {
    //     console.log(error, stdout, stderr);
    //     // if (error) {
    //     //     // event.reply('get:computer:registry', {error: error.message})
    //     //     return
    //     // }
    //     // if (stderr) {
    //     //     // event.reply('get:computer:registry', {error: stderr})
    //     //     return
    //     // }
    //     // event.reply('get:computer:registry', {data: stdout})
    // })
    // 读取用户安装的软件列表
    const softwareList = execSync('wmic product get name').toString().split('\n').slice(1).map(line => line.trim()).filter(Boolean);
    console.log('已安装的软件:', softwareList);
})


// fs.readdir('C:\\Program Files', (err, files) => {
//     if (err) {
//         console.error('读取目录出错:', err);
//         return;
//     }
//     const softwareList = files.map(file => path.join('C:\\Program Files', file));
//     console.log('C:\\Program Files 目录下的文件:', softwareList);
// })
// fs.readdir('~/Library/Saved Application Links', (err, files) => {
//     if (err) {
//         console.error('读取目录出错:', err);
//         return;
//     }
//     const softwareList = files.map(file => path.join('C:\\Program Files', file));
//     console.log('~/Library/Saved Application Links', softwareList);
// })

ipcMain.handle('qy:nativeImage', (event, imagePath) => {
    if (!imagePath) return '';
    console.log(path.join(imagePath), 'path.join(imagePath)');
    let i = nativeImage.createFromPath(path.join(imagePath));
    console.log(i?.toDataURL());
    return nativeImage.createFromPath(path.join(imagePath))
})


