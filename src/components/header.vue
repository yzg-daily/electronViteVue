<script setup lang="ts">
import {CloseBold, SemiSelect} from '@element-plus/icons-vue'
import {ref} from "vue";
import pkg from '../../package.json'

const handleBtn = (type = '') => {
  if (!type) return false
  window.ipcRenderer.send(`qy:headerBtn`, type)
}
const appName = ref(pkg.name)
async function getAppName () {
  appName.value =  await window.ipcRenderer.invoke('get:appName');
}
getAppName()


</script>

<template>
  <header class="window-header flex justify-between drag">
     <div class="lf-content">

     </div>
    <div class="app-name">
      {{appName}}
    </div>
    <div class="window-btn">
      <el-button size="small" @click="handleBtn('minimize')" link :icon="SemiSelect" />
<!--      <el-button size="small" link :icon="CopyDocument" />-->
      <el-button size="small" @click="handleBtn('close')" link :icon="CloseBold" />
    </div>
  </header>
</template>

<style scoped lang="less">

</style>