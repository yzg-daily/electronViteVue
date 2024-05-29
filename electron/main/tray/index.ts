import path from 'path'
import {ipcMain, app, Menu, Tray, dialog, type MessageBoxOptions} from 'electron'
import log from 'electron-log'

import {isMac} from "../../utils";
// Tray 是一个小图标，它位于系统的通知区域，通常被用来实现快速的应用程序启动、通知等功能
// 注意 icon 的命名。mac 是xxxTemplate,这里直接用mac命名格式.建议不要使用 xx-xx.png 格式
// icon 默认是放在了 public/icon 下。打包之后app.asar下并没有public目录,打包之后反问app.asar/dist
let trayIcon = null
let iconPath = path.join(`${process.env.VITE_PUBLIC}/icon/32x32Template.png`)
log.info(`trayIcon: ${iconPath}`)
function createTray(win) {
    trayIcon = new Tray(iconPath)
    // 基础功能
    const contextMenu = Menu.buildFromTemplate([
        // {
        //     label: 'Remove',
        //     click: () => {
        //         trayIcon.destroy()
        //     }
        // },
        {
            label: app.name,
            click: () => {
                if (win && !win.isVisible()) {
                    win.show()
                }
            }
        },
        {
            label: '消息提示',
            click: () => {
                messageTip();
            }
        },
        {label: '退出', click: () => app.quit()}
    ])
    trayIcon.setToolTip(app.name)
    trayIcon.setContextMenu(contextMenu)
    trayIcon.on('click', () => {
        if (!win.isVisible()) {
            win.show()
            win.focus()
        }
        if (isMac && app.isHidden()) {
            app.show()
        }
        win.setAlwaysOnTop(true);
        let time = setTimeout(() => {
            win.setAlwaysOnTop(false);
        }, 0)
    })
    app.on('window-all-closed', () => {
        if (trayIcon) trayIcon.destroy()
    })
}

function findIconPath(name: string) {
    if (isMac) {
        return path.join(app.getAppPath(), `public/icon/${name}Template.png`)
    } else {
        return path.join(app.getAppPath(), `public/icon/${name}.png`)
    }

}
export function setTrayImage(imagePath?: string) {
    trayIcon.setImage(imagePath)
}


// 有新消息的时候，可以在 Tray 上显示一个小红点 或者 Tray 闪烁
let trayIconIndex = null;
function messageTip() {
    if (!trayIcon) {
        return
    }
    const options: MessageBoxOptions = {
        type: 'info',
        title: '提示',
        message: "我在提示你",
        buttons: ['Yes', 'No']
    }
    // dialog.showMessageBox(null, options).then(res => {
    //     console.log(res);
    // })
    // 每隔一秒钟切换一次 Tray 的图标
    let status = false;
    let num = 0;
    // setTrayImage(findIconPath('32x32.png'))
    // trayIcon.displayBalloon({
    //     title: '这个地区发',
    //     iconType: 'custom',
    //     content: '了哇哈哈'
    // })
    let a = setInterval(() => {
        status = !status
        num++;
        setTrayImage(findIconPath(status ? 'drag': '32x32'))
        if (num >= 5) {
            num = 0;
            clearInterval(a)
            setTrayImage(findIconPath('32x32'))
        }
    }, 800);

}
export default createTray

