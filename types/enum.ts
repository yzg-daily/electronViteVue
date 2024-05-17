// export const enum TodoType {
//     'primary',
//     'success',
//     'warning' ,
//     'danger' ,
//     'info' ,
// }
export type TodoType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export const enum TodoTypeText {
    '常规任务',
    '长期任务',
    '加速任务',
   '紧急任务',
    '提示任务',
}
export const todoType = [
    {label: '', type: ''}
]

export const enum ResCodeEnum {
    File,
    Ok
}