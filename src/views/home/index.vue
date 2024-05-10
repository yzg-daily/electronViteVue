<script setup lang="ts">

import {ref} from "vue";

const keyword = ref('qy')
</script>

<template>
  <div>
    <header class="w-full p-[10px]">
      <el-input v-model="keyword" class="h-[60px] !border-0" placeholder="请输入"/>
    </header>
  </div>
</template>

<style scoped>

</style>