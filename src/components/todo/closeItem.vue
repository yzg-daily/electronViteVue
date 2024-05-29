<script setup lang="ts">
import {computed} from "vue";

interface Props {
  content: string,
  status: boolean
}
const props = defineProps<Props>()

</script>

<template>
  <el-text truncated line-clamp="2" tag="del" class="status-text qy-transition  text-xs text-[red] absolute w-0 left-0 top-[1px]" :class="{'!w-full': props.status}">
    {{props.content}}
  </el-text>
</template>

<style scoped lang="less">

</style>