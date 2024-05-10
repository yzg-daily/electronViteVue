import path from 'path'
import {ipcMain, app, Menu, Tray, dialog, type MessageBoxOptions} from 'electron'

import {isMac} from "../../utils";
// Tray 是一个小图标，它位于系统的通知区域，通常被用来实现快速的应用程序启动、通知等功能
let appIcon = null
let iconPath = app.getAppPath() + path.join('/public/icon', isMac ? 'iconTemplate.png' : '32x32-h.png')

function createTray(win) {
    appIcon = new Tray(iconPath)
    const contextMenu = Menu.buildFromTemplate([
        // {
        //     label: 'Remove',
        //     click: () => {
        //         appIcon.destroy()
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
    //
    appIcon.setToolTip(app.name)
    appIcon.setContextMenu(contextMenu)
    app.on('window-all-closed', () => {
        if (appIcon) appIcon.destroy()
    })
}

function findIconPath(name: string) {
    if (isMac) {
        return path.join(app.getAppPath(), `public/icon/${name}Template.png`)
    } else {
        return path.join(app.getAppPath(), `public/icon/${name}`)
    }

}
export function setTrayImage(imagePath?: string) {
    appIcon.setImage(imagePath)
}


// 有新消息的时候，可以在 Tray 上显示一个小红点 或者 Tray 闪烁
let appIconIndex = null;
function messageTip() {
    if (!appIcon) {
        return
    }
    const options: MessageBoxOptions = {
        type: 'info',
        title: '提示',
        message: "我在提示你",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBox(null, options).then(res => {
        console.log(res);
    })
    // 每隔一秒钟切换一次 Tray 的图标
    let status = false;
    let num = 0;
    // setTrayImage(findIconPath('32x32.png'))
    appIcon.displayBalloon({
        title: '这个地区发',
        iconType: 'custom',
        content: '了哇哈哈'
    })
    let a = setInterval(() => {
        status = !status
        num++;
        console.log(num);
        setTrayImage(findIconPath(status ? '32x32.png': '32x32-h.png'))
        if (num >= 5) {
            num = 0;
            clearInterval(a)
            setTrayImage(findIconPath('32x32-h.png'))
        }
    }, 800);

}


export default createTray

