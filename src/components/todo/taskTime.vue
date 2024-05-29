<script setup lang="ts">

import {formatDateTime} from "../../utils/times";
import {computed} from "vue";
interface Props {
  time: number
}
const props = defineProps<Props>()
const time = computed(() => formatDateTime(props.time))
</script>

<template>
  <div class="text-center" v-if="time">
    <span class="todo-time rounded text-xs "> {{time}} </span>
  </div>
</template>

<style scoped lang="less">
.todo-time {
  text-align: center;
  padding: 2px 5px;
  background-color: #DADADA;
}
</style>