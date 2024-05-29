<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {FormRules} from "element-plus";


interface Props {
  record: any
}

const props = withDefaults(defineProps<Props>(), {
  record: {}
})
interface FormData {
  values: TodoItem,
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

window.addEventListener('keyup', (event) => {
  // console.log(event.target!.tagName);
  // if (event.target.tagName.toLowerCase() === 'textarea') {
  //
  // }
}, true)


defineExpose({
  handleClose,
  handleShow
})
</script>

<template>
  <el-dialog close-on-press-escape title="编辑任务" :modal="false" v-model="show" destroy-on-close @close="handleClose">
    <el-form :model="formData.values" :rules="formData.rules" ref="formRef">
      <el-form-item prop="title">
        <el-input placeholder="任务名称" v-model="formData.values.title" />
      </el-form-item>
      <el-form-item prop="content">
        <el-input type="textarea" rows="5" placeholder="任务内容" v-model="formData.values.content"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onSubmit" @keyup.enter="onSubmit" type="primary">保存</el-button>
      <el-button @click="handleClose">取消</el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="less">

</style>