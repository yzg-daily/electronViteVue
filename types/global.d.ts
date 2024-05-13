enum TodoType {
    'primary',
    'success',
    'warning',
    'danger',
    'info',
}
declare global {
    interface HomeListItem {
        name: string, // 名称
        icon?: string, // 图标
        image?: string, // 图片
        url?: string, // 定义为外链
        path?: string, // vue-router
        href?: string, // a标签处理
    }
    interface TodoItem {
        id?: number;
        title: string;
        content: string;
        status: boolean; // 是否执行中
        createTime?: string;
        type: TodoType;
        children: any[]
    }
    interface GroupItem {
        id?: number;
        title: string;
        subtitle: string; // 副标题 描述之类的
        status: boolean; // 是否执行中
        createTime?: string;
        type: TodoType;
        children: TodoItem[]
    }
}