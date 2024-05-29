import {app} from 'electron'
import {createRequire} from 'node:module'
import {fileURLToPath} from 'node:url'
import path from 'node:path' // path 可能会有命名冲突问题
// 开发中得环境变量(约定!!!)
// import.meta.url 是 ES 模块中的一个特殊变量，它提供了当前模块文件的 URL 地址。它是一个只读的变量，可以用于获取当前模块文件的绝对路径。
// 在 Node.js 中，import.meta.url 返回的是当前模块文件的文件 URL 地址。这个 URL 地址使用 file:// 协议表示文件系统中的路径，可以通过 url 模块中的 fileURLToPath() 方法将其转换为文件路径。
// 在浏览器环境中，import.meta.url 返回的是当前模块文件的绝对路径的 URL 地址。
// 你可以使用 import.meta.url 来获取当前模块文件的路径，以便在模块中进行相应的操作，比如动态地加载其他模块、读取文件等
export const require = createRequire(import.meta.url) // 根目录
export const __dirname = path.dirname(fileURLToPath(import.meta.url)) // 当前文件得相对路径
process.env.__dirname = __dirname
process.env.APP_ROOT = path.join(__dirname, '../..') // 项目根目录
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
/**
 * 项目打包目录. 开发时 /dist， 打包之后时app.asar内目录
 *  electron-build 打包时 asar: true|false true 是生成electron内可读取得app.asar文件， false时是普通得文件目录
 */
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.RENDERER_DIST = RENDERER_DIST
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL // 开发中是 本地服务地址，打包后为空
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
    ? path.join(process.env.APP_ROOT, 'public')
    : RENDERER_DIST // 静态目录: 开发中是 public目录, 打包访问 app.asar 内 /dist


process.env.VITE_USER_DATA_URL = app.getPath('userData') // 本地持久化数据缓存目录(默认)
