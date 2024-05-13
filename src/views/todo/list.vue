<script setup lang="ts">
import {Message, Setting, Delete, Plus} from '@element-plus/icons-vue'
import {ref}  from "vue";
defineOptions({
  name: 'to-do-list'
})
const todoList = ref<GroupItem>([
  {
    title: '我是官方',
    subtitle: '官方标题',
    status: true,
    type: 'danger',
    children: [
        {title: '我是任务', status: 'danger', content: '我是任务内容'},
        {title: '我是任务1', status: 'danger', content: '我是任务内容1'},
        {title: '我是任务2', status: 'danger', content: '我是任务内容2'},
    ]
  },
  {
    title: '我是官方',
    subtitle: '官方标题',
    status: true,
    type: 'danger'
  }
])
const currentGroup = ref<TodoItem>({title: '', subtitle: '', status: '', children: []})
function handleGroupItem(el: GroupItem) {
  currentGroup.value = el;
}
</script>

<template>
  <div class="to-do flex border h-full min-h-[500px]">
    <div class="menu min-w-[60px] w-[60px] bg-[#09090b] ">
      <ul>
        <li class="menu-item flex-center flex-col py-3">
          <el-avatar :size="40" />
        </li>
        <li class="menu-item flex-center flex-col py-3 hover:bg-[#262626]">
          <el-badge :value="12" class="item">
            <el-icon size="30" color="#fff"><Message /></el-icon>
          </el-badge>
        </li>
        <li class="menu-item flex-center flex-col py-3 hover:bg-[#262626]">
          <el-icon size="30" color="#fff"><Setting /></el-icon>
        </li>
      </ul>
    </div>
    <div class="group min-w-[240px] w-[240px] bg-[#fafafa]">
      <div class="group-header p-[10px] border-cyan-100 flex items-center">
        <el-input placeholder="搜索" class="text-white"/>
        <div class="header-plus">
          <el-icon size="16" color="#000"><Plus /></el-icon>
        </div>
      </div>
      <ul>
        <li class="group-item relative p-[10px] flex items-center" v-for="(el, index) in todoList" @click="handleGroupItem(el)" :key="'group-' + index + '-' +el.title">
          <!--    可自定义 默认显示分类的优先级      -->
          <div class="group-item-icon rounded bg-gray-500 w-[40px] h-[40px] mr-2"></div>
          <div>
            <p class="title text-sm">{{ el.title }}</p>
            <p class="text-xs text-[#999999]">{{ el.subtitle }}</p>
          </div>
          <div class="group-right qy-transition">
            <el-icon size="20" color="#000"><Delete /></el-icon>
          </div>
        </li>
      </ul>
    </div>
    <div class="group-list w-full flex-col bg-[#f5f5f5]">
      <div class="group-list-header flex" v-show="currentGroup.title">
        <div>
          <p class="text-sm">{{currentGroup.title}}</p>
          <p class="text-xs">{{currentGroup.subtitle}}</p>
        </div>
        <div class="group-status ml-4">
          <el-badge is-dot :type="currentGroup.type || 'info'" />
        </div>
      </div>
      <ul class="list-item-box" v-show="currentGroup && currentGroup.children && currentGroup.children.length > 0">
        <li class="list-item rounded-x" v-for="(el, index) in currentGroup.children" :key="'group-list-item' + index">
          <div class="todo-time rounded text-xs m-auto max-w-[120px]">2024-05-11 18:21</div>
          <div class="todo-content rounded">
            <div class="list-item-title">我是标题</div>
            <div class="list-item-content">我是内容</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.to-do {
  --b-c: #e7e5e4;
  --p: 10px;
  .group-header {
    background-color: #fff;
    border-bottom: 1px solid var(--b-c);

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
  .group {
    background-color: #E6E5E5;
    border-right: 1px solid var(--b-c);

    :deep(.el-input__wrapper) {
      background-color: #E2E2E2;
      input {
        color: #fff;
        font-size: 14px;
      }
    }
    .group-item {
      overflow: hidden;
      .group-right {
        position: absolute;
        right: -50px;
        font-size: 20px;
        color: #646cff;
        font-weight: 600;
      }
    }

    .group-item:hover {
      background-color: #CBCACA;
      .group-right {
        right: var(--p);
      }
    }

  }
  .group-list {
    .group-list-header {
      padding: 8px var(--p) ;
      border-bottom: 1px solid var(--b-c);
      deep(.el-badge__content.is-dot) {
      width: 15px;
      height: 15px;
    }
    }
    .list-item-box {
      padding: var(--p);
      .list-item {
        padding: var(--p);
        //background-color: #fff;
      }

      .todo-time {
        text-align: center;
        padding: 5px;
        background-color: #DADADA;
      }
      .todo-content {
        padding: var(--p);
        background-color: #fff;
        margin-top: 20px;
      }
      .todo-content:hover {
        box-shadow: 0 10px 20px -18px;
      }
    }


  }
}
</style>