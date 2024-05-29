<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {FormRules} from "element-plus";
import todoIcon from '@c/todo/todoIcons.vue'
interface Props {
  record: any
}

const props = withDefaults(defineProps<Props>(), {
  record: {}
})
interface FormData {
    values: GroupItem,
    rules: FormRules
  }

const show = ref(false);
const formData: FormData = reactive({
    values: {},
    rules: {
      title: [{required: true, message: '请输入分组名称'}],
      subtitle: [{required: true, message: '请输入标题'}],
    },
  })

watch(
    () => props.record,
    val => {
      Object.keys(val).forEach(key => {
        formData.values[key] = val?.[key] || undefined;
      });
    },
    {
      immediate: true,
      deep: true
    }
);
function handleShow () {
    show.value = true
  }
function handleClose () {
  show.value = false;
  formData.values = {};

}

const emit = defineEmits(['on-submit'])

const formRef = ref()
function onSubmit () {
  formRef.value.validate((s: boolean) => {
    if(!s) return false;
    const now = new Date().getTime();
    const { createTime, children } = formData.values
    emit('on-submit', {
      ...formData.values,
      children: children ?? [],
      updateTime: new Date().getTime(),
      createTime: createTime ?? now,
      // uuid: id ?? uuid() // 外部处理
    })
  })
}



defineExpose({
  handleClose,
  handleShow
})
</script>

<template>
    <el-dialog title="编辑" v-model="show" destroy-on-close @close="handleClose">
       <el-form :model="formData.values" :rules="formData.rules" ref="formRef">
         <el-form-item prop="title">
           <el-input placeholder="分组名称" v-model.trim="formData.values.title" />
         </el-form-item>
         <el-form-item prop="subtitle">
           <el-input placeholder="标题" v-model.trim="formData.values.subtitle"></el-input>
         </el-form-item>
         <el-form-item class="w-full" prop="icon">
           <el-popover trigger="click" :width="160">
              <template #reference>
                <el-image class="w-[60px]" :src="formData.values.icon" v-if="formData.values.icon"></el-image>
                <span v-else>请选中分组图片</span>
              </template>
             <todoIcon  v-model="formData.values.icon"/>
           </el-popover>
         </el-form-item>
       </el-form>
       <template #footer>
         <el-button @click="onSubmit" type="primary">保存</el-button>
         <el-button @click="handleClose">取消</el-button>
       </template>
    </el-dialog>
</template>

<style scoped lang="less">

</style>