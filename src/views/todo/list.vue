<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {Delete, Edit, Message, Plus, Setting, MoreFilled} from '@element-plus/icons-vue'
import {uuid} from "@u"
import pageHeader from '@c/header.vue'
import editForm from '@c/todo/editForm.vue'

import editTask from '@c/todo/editTask.vue'
import TaskItem from '@c/todo/taskItem.vue'
import TaskItemTime from '@c/todo/taskTime.vue'
import todoSet from '@c/todo/todoSet.vue'

import {getJson, savaJson} from '../../utils/save'



defineOptions({
  name: 'to-do-list'
})

const defaultData = [
  {
    id: uuid(),
    title: '我是官方',
    subtitle: '使用说明！',
    status: true,
    // type: 'danger',
    weight: 1,
    children: [
      {
        title: '',
        type: 'primary',
        // status: 'danger',
        content: '这是官方得说明。分组建议您按照时间，任务类型，紧急程度等进行分类管理，也可随心搭配！',
        startTime: new Date().getTime(),
        endTime: new Date().getTime(),
        createTime: new Date().getTime(),
        updateTime: new Date().getTime(),
      },
    ]
  }
]
const todoList = ref<GroupItem[]>([])
const currentGroup = ref<GroupItem>({
  title: '',
  subtitle: '',
  icon: undefined,
  type: 'primary',
  status: false,
  children: []
})
const record = ref<GroupItem | undefined>(undefined);
const editFormRef = ref();
function handleGroupItem(el: GroupItem, index: number) {
  currentGroup.value = {
    ...el,
    index,
    children: el?.children ?? []
  };
}
function handleGroupAdd() {
  record.value = undefined;
  editFormRef.value.handleShow();
}
function handleGroupEdit(el: GroupItem, index: number) {
  handleGroupAdd();
  record.value = {
    ...el,
    children: [...(el?.children || [])],
    index
  };
}
function handleGroupDel(index: number, id: string | undefined) {
  todoList.value.splice(index, 1);
  if (!id) return false;
  if (currentGroup.value.id === id) currentGroup.value = {};
}
function onSubmit(values: GroupItem) {
  const {id, index} = values;
  if (!id) {
    todoList.value.push({
      ...values,
      id: uuid(),
    });
  } else {
    todoList.value[index as number] = {...values};
  }

  editFormRef.value.handleClose();

}
onMounted(async () => {
  const res :Res = await getJson('toDoJSON');
  let list = res?.data?.todoList;
  if (!list || !list?.length) {
    list = defaultData
  }
  todoList.value = list
})


// 任务
const taskFormRef = ref();
const currentTask = ref<TodoItem>()
function handleAddTask () {
  currentTask.value = undefined;
  taskFormRef.value.handleShow();
}
function handleDelTask(index:number) {
  todoList.value[currentGroup.value.index || 0]!.children?.splice(index, 1)
}
function handleEditTask (task: TodoItem, index: number) {
  handleAddTask();
  currentTask.value = {...task, index};
}
function onSubmitTask(task: TodoItem) {
  try {
    const {id} = task;
    const {index = 0} = currentGroup.value;
    const children = todoList.value?.[index]?.children;
    if (!children) {
      todoList.value[index]['children'] = []
    }
    // 清楚 task 中的 index
    let item = {
      ...task,
      index: undefined,
      id: uuid(), pid:
      currentGroup.value.id,
      status: task?.status ?? false
    }
    if (!id) {
      todoList.value![index]!.children!.unshift(item)
    } else {
      todoList.value![index]!.children!.splice(task.index, 1, item)
    }
    taskFormRef.value?.handleClose();
  } catch (e) {
    console.warn(e, '出错了哦')
  }
}
// 保存数据
watch(() => todoList.value, (val) => {
  savaJson({todoList: val})
}, {deep: true})


const todoSetRef = ref()

function showSet() {
  todoSetRef.value.show()
}

</script>

<template>
  <div class="to-do flex border h-full min-h-[500px]">
    <div class="menu bg-[#09090b] ">
      <ul>
        <li class="menu-item flex-center flex-col py-3">
          <el-avatar :size="40"/>
        </li>
        <li class="menu-item flex-center flex-col py-3 hover:bg-[#262626]">
          <el-badge :value="12" class="item">
            <el-icon size="30" color="#fff">
              <Message/>
            </el-icon>
          </el-badge>
        </li>
        <li class="menu-item flex-center flex-col py-3 hover:bg-[#262626]">
          <el-icon size="30" color="#fff">
            <Setting @click="showSet"/>
          </el-icon>
        </li>
      </ul>
    </div>
    <div class="task-content">
      <page-header/>
      <div class="flex w-full h-full">
        <div class="grouping  bg-[#fafafa]">
          <div class="group-header p-[10px]  flex items-center">
            <el-input placeholder="搜索" class="group-header-search text-white"/>
            <div class="header-plus" @click="handleGroupAdd">
              <el-icon size="16" color="#000">
                <Plus/>
              </el-icon>
            </div>
          </div>
          <div class="group-items">
            <el-scrollbar>
              <ul>
                <li class="group-item handle-item relative p-[10px] flex items-center" v-for="(el, index) in todoList"
                    @click="handleGroupItem(el, index)" :key="'group-' + index + '-' +el.title">
                  <!--    可自定义 默认显示分类的优先级      -->
                  <div class="group-item-icon rounded-xl w-[40px] h-[40px] mr-2" :class="{'bg-gray-500': !el.icon}">
                    <el-image v-if="el.icon" :src="el.icon"></el-image>
                  </div>
                  <div>
                    <p class="title text-sm">{{ el.title }}</p>
                    <p class="text-xs text-[#999999]">{{ el.subtitle }}</p>
                  </div>
                  <div class="item-right qy-transition">
                    <el-icon size="20" color="#000">
                      <Edit @click.stop="handleGroupEdit(el, index)"/>
                    </el-icon>
                    <el-icon size="20" color="#000">
                      <Delete @click.stop="handleGroupDel(index, el.id)"/>
                    </el-icon>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <div class="group-list w-full flex-col" id="group-list">
          <div class="group-list-header flex justify-between items-center" v-show="currentGroup.title">
            <div class="flex">
              <div>
                <p class="text-sm">{{ currentGroup.title }}</p>
<!--                <p class="text-xs">{{ currentGroup.subtitle }}</p>-->
              </div>
              <div class="group-status ml-4">
                <el-badge is-dot :type="currentGroup.type || 'info'"/>
              </div>
            </div>
            <div class="header-btn">
<!--              <el-dropdown>-->
<!--                <el-button link>-->
<!--                  <el-icon><MoreFilled /></el-icon>-->
<!--                </el-button>-->
<!--                <template #dropdown>-->
<!--                  <el-dropdown-menu>-->
<!--                    <el-dropdown-item @click="handleAddTask">新增任务</el-dropdown-item>-->
<!--                    <el-dropdown-item type="danger" @click="handleGroupDel(currentGroup.index as number, currentGroup.id)">删除分组</el-dropdown-item>-->
<!--                  </el-dropdown-menu>-->
<!--                </template>-->
<!--              </el-dropdown>-->
            </div>
          </div>
          <div class="task w-full relative">
            <el-scrollbar class="w-full">
              <ul class="list-item-box" v-show="currentGroup && currentGroup.children && currentGroup.children.length > 0">
                <li class="list-item rounded-x" v-for="(el,index) in currentGroup.children" :key="el.id" >
                  <TaskItemTime :time="el.createTime" v-if="el.createTime"/>
                  <div class="bg-white rounded p-2 overflow-hidden flex items-baseline mt-[12px]">
                    <el-checkbox v-model="el.status"/>
                    <TaskItem @click="handleEditTask(el, index)" :el="el" @del-task="handleDelTask(index)"/>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
            <el-button class="add-task_btn opacity-50 hover:opacity-100" :icon="Plus" @click="handleAddTask"/>
          </div>
        </div>
      </div>
    </div>
    <edit-form :record="record" ref="editFormRef" @on-submit="onSubmit"/>
    <edit-task :record="currentTask" ref="taskFormRef" @on-submit="onSubmitTask"/>
    <todo-set ref="todoSetRef"/>
  </div>
</template>

<style scoped lang="less">
.to-do {
  --bC: #e7e5e4;
  --p: 10px;
  --w: 700px;
  --h: 600px;
  --headerH: 53px;
  --groupW: 225px;
  --menuW: 55px;

  width: var(--w);
  height: var(--h);
  overflow: hidden;

  .menu {
    width: var(--menuW);
    flex: 0 0 var(--menuW)
  }
  .task-content {
    width: calc(100% - var(--menuW));
    :deep(.window-header) {
      border-bottom: 1px solid var(--bC);
     }
  }


  .group-header {
    background-color: #fff;
    border-bottom: 1px solid var(--bC);

    .header-plus {
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #E2E2E2;
      margin-left: var(--p);
    }
  }


  .group-list {
    background-color: #f5f5f5;
    //width: calc(100% - var(--groupW) - var(--menuW));
    overflow: hidden;
    .group-list-header {
      padding: 8px var(--p);
      border-bottom: 1px solid var(--bC);
      max-height: 53px;
      background-color: #fff;
      //v-deep() .el-badge__content.is-dot{
      //  width: 15px;
      //  height: 15px;
      //}
    }
    .list-item-box {
      padding: var(--p);

      .list-item {
        padding: var(--p);
        //background-color: #fff;
        :deep(.task-item) {
          width: 100%;
          overflow: hidden;
          .todo-content:hover {
            box-shadow: 0 2px 10px -18px;
          }
        }
      }
    }
    .task {
      height: calc(100% - 53px);
      overflow: hidden;
    }
  }

  .grouping {
    width: var(--groupW);
    flex: 0 0 var(--groupW);
    background-color: #E6E5E5;
    border-right: 1px solid var(--bC);

    .group-header-search {
      :deep(.el-input__wrapper) {
        background-color: #E2E2E2;

        input {
          color: #fff;
          font-size: 14px;
        }
      }
    }


    .group-item {
      overflow: hidden;
    }

    .group-item:hover {
      background-color: #CBCACA;
    }
  }


  .group-items {
    height: calc(100% - var(--headerH));
  }

  .add-task_btn {
    position: absolute;
    width: 35px;
    height: 35px;
    bottom: 25px;
    right: 15px;
  }
}
</style>
