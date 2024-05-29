import {app, ipcMain, BaseWindow} from 'electron'
import {isMac} from "../../utils";
import log from 'electron-log'
ipcMain.on('qy:headerBtn', (event, type) => {

    log.info(`ipcMain: qy:headerBtn-> ${type}`)
    switch (type) {
        case 'minimize':
            const win = BaseWindow.fromId(event.frameId)
            if (win.isVisible()) {
                win.hide();
            }
            break;
        case 'close':
            if (process.platform !== 'darwin') app.quit()
            break;
        default:
            log.warning(`请在qy:headerBtn事件中定义${type}相关的事件`)
    }
})
ipcMain.handle('get:appName', (event, type) => {
    return app.name;
})


