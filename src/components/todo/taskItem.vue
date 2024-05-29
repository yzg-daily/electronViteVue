<script setup lang="ts">

 import {Delete} from "@element-plus/icons-vue";
 import {computed} from "vue";
 import delContent from '@c/todo/closeItem.vue'

 defineOptions({
   name: 'TaskItem'
 })
 const emit = defineEmits(['del-task', 'change'])
interface Props {
  el: TodoItem
}
 const props = defineProps<Props>()
 const el: TodoItem = computed(() => props?.el || {})
 // const handleChange = val => props.el.status = val as boolean;
</script>

<template>
  <div class="task-item qy-transition">
    <transition class="taskOver">
      <div class="todo-content rounded w-full handle-item flex items-baseline">
        <div class="ml-2">
          <div class="list-item-title" v-if="el.title">
            {{ el.title }}
          </div>
          <div class="group list-item-content w-full overflow-hidden relative" v-if="el.content">
            <el-text truncated line-clamp="2" class="w-full text-xs text-[#999999] ">
              {{el.content}}
            </el-text>
            <delContent :content="el.content" :status="el.status"/>
          </div>
        </div>
        <div class="item-right qy-transition bg-white">
          <el-icon size="20" color="#000">
            <Delete @click.stop="() => emit('del-task', el)"/>
          </el-icon>
        </div>
      </div>
    </transition>
  </div>
</template>
