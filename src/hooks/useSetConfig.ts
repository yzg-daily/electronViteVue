import {reactive} from "vue";


/**
 * 封装一个hook，返回主进程中process.env 配置
 * 会读取 getPath('userData')/task/config.json
 * 如果读取失败，则返回默认配置
 * @param {string} keyName
 * @returns {object}
 * */
// const {VITE_CONFIG_URL} = import.meta.env
export default function useSetConfig (keyName = undefined) {
    const processEnv = reactive(window.ipcRenderer?.processEnv)
    if (!keyName) return processEnv
    return  processEnv?.[keyName]
}
