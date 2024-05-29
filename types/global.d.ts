import {TodoType, ResCodeEnum} from './enum'
declare global {

    interface ItemTime {
        createTime?: Date | number;
        startTime?: Date | number;
        endTime?: Date | number;
        updateTime?: Date | number;
    }

    interface HomeListItem {
        name: string, // 名称
        icon?: string, // 图标
        image?: string, // 图片
        url?: string, // 定义为外链
        path?: string, // vue-router
        href?: string, // a标签处理
        [propName:string]: any
    }
    interface TodoItem extends ItemTime {
        id?: string|undefined;
        pid?: string|undefined;
        title?: string;
        content?: string;
        status?: boolean; // 是否执行中
        type?: TodoType;
        [propName:string]: any
    }
    interface GroupItem extends ItemTime {
        id?: string|undefined;
        index?: number;
        title?: string;
        subtitle?: string; // 副标题 描述之类的
        icon?: string; //
        status?: boolean; // 是否执行中
        type?: TodoType;
        children?: TodoItem[],
        weight?: number; // 权重，置顶操作
        [propName:string]: any
    }


    interface Res<T = any> {
        code: ResCodeEnum;
        msg?: string,
        data?: T
    }
}