<script setup lang="ts">
 const props = defineProps<{
   msg: string,
   icon?: string
 }>()
</script>

<template>
  <div :class="{'hasMessage': !!props.msg}"
      class="notification transition-all  text-center text-sm min-w-[100px] max-w-[50%] h-8 leading-8 bg-black rounded-2xl m-auto hover:h-9 hover:leading-9">
     <div class="message text-white">{{ props.msg }}</div>
  </div>
</template>

<style scoped lang="less">
 //.notification {
 //  @apply: w-[]
 //}

 .notification {
   position: absolute;
   z-index: 2;
   top: 0;
   left: 50%;
   transform: translate(-50%, -100%);
   transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
 }
 .hasMessage {
   transform: translate(-50%, 28%);
 }
</style>