import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path' // path 可能会有命名冲突问题
import os from 'node:os' // 获取操作系统相关的信息
import createTray from '../main/tray/index'
import '../main/ipc/index'
// import.meta.url 是 ES 模块中的一个特殊变量，它提供了当前模块文件的 URL 地址。它是一个只读的变量，可以用于获取当前模块文件的绝对路径。
// 在 Node.js 中，import.meta.url 返回的是当前模块文件的文件 URL 地址。这个 URL 地址使用 file:// 协议表示文件系统中的路径，可以通过 url 模块中的 fileURLToPath() 方法将其转换为文件路径。
// 在浏览器环境中，import.meta.url 返回的是当前模块文件的绝对路径的 URL 地址。
// 你可以使用 import.meta.url 来获取当前模块文件的路径，以便在模块中进行相应的操作，比如动态地加载其他模块、读取文件等
const require = createRequire(import.meta.url)
// 获取当前模块的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 项目根目录
process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
// 开发中是 本地服务地址，打包后为空
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL
// 静态目录
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())
// 防止应用程序多次实例化，以及确保应用程序的单一性非常有用
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'QY', // index.html 中的 <title>xxx</title> 会覆盖这里
    width: 700,
    height: 600,
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    frame: false,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  })
  createTray(win);
  if (VITE_DEV_SERVER_URL) { // #298
    win.loadURL(VITE_DEV_SERVER_URL)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

// New window example arg: new windows url
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})
