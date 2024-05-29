import {ResCodeEnum} from "../../types/enum";

const { VITE_USER_DATA_URL } = import.meta.env;
let todoJsonUrl = VITE_USER_DATA_URL + '/task/data.json';

function createSuccess (data = undefined, msg = '操作成功!') {
    return {
        code: ResCodeEnum.Ok,
        data,
        msg
    }
}
function createError (e: Error|undefined, msg = '操作失败！') {
    return {
        code: ResCodeEnum.File,
        meg: `${msg} ${e || ''}`,
    }
}

export async function savaJson (json: object): Promise<Res<{todoList: GroupItem[]}>> {
    if (!json) return createError(undefined, '保存失败');
    try {
        let content = JSON.stringify(json)
        localStorage.setItem('toDoJSON', content)
        window.ipcRenderer.invoke('qy:saveFile', {
            filePath: todoJsonUrl,
            content
        })
        return createSuccess()
    } catch (e: any) {
        return createError(e, '保存失败')

    }
}
export async function getJson (keyName = 'toDoJSON') {
    if (!keyName) return createError(undefined, '读取失败');
    try {
        const res = await window.ipcRenderer.invoke('qy:readyFile', todoJsonUrl);
        let json = res?.data || localStorage.getItem(keyName) || "";
        return createSuccess(JSON.parse(json))
    } catch (e: any) {
        return createError(e, '读取失败')
    }
}
