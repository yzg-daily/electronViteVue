<script setup lang="ts">
import {reactive, ref} from "vue";
import useProcess from "../../hooks/useProcess";
import {ElMessage} from "element-plus";

const VITE_USER_DATA_URL = useProcess("VITE_USER_DATA_URL")


const visible = ref(false)
const tab = ref('file')

function show() {
  visible.value = true
}

function close() {
  visible.value = false
}

const config = reactive({
  fileUrl: VITE_USER_DATA_URL
})

async function openPath () {
  const res = await window.ipcRenderer.invoke('qy:openPath', config.fileUrl)
  if (res) {
    ElMessage.error('没有找到该路径')
  }
}

defineExpose({
  show
})

</script>
<template>
  <el-drawer v-model="visible"
             @close="close"
             title="设置"
             destroy-on-close size="70%">
    <el-tabs tab-position="left" v-model="tab">
      <el-tab-pane label="文件管理" name="file">
        <el-form>
          <el-form-item label="文件管理">
            <div class="flex-col">
              <el-input type="textarea" disabled v-model="config.fileUrl"/>
              <div class="tips">文件的默认保存位置</div>
              <div>
                <el-button size="small" >修改</el-button>
                <el-button size="small" @click="openPath">打开</el-button>
              </div>
            </div>

          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>
<style scoped lang="less">
</style>
