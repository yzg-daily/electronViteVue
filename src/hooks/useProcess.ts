import {reactive} from "vue";

/**
 * 获取主进程中的process
 * @returns process | process.key
 * */
export default function useProcess (keyName:string) {
    const processEnv = reactive(window.ipcRenderer?.processEnv)
    if (!keyName) return processEnv
    return  processEnv?.[keyName]
}
