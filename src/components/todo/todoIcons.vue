<script setup lang="ts">

import {ref} from "vue";
const imagePromises = import.meta.glob('@/assets/images/todoIcon/*.png');

const images = ref(Object.keys(imagePromises).map(el => el))
const emit = defineEmits(['update:modelValue'])
async function handleSelectImage (imageUrl: string) {
  let image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = imageUrl;
  image.onload = () => {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context!.fillStyle = "transparent";
    context!.fillRect(0, 0, canvas.width, canvas.height);
    context!.drawImage(image, 0, 0, image.width, image.height);
    emit('update:modelValue', canvas.toDataURL('image/png', 0.8))
  };
}

</script>
<template>
  <div class="ions w-full">
    <ul class="flex flex-wrap gap-3 w-full">
      <li class="w-[35px] h-[35px] hover:scale-110" v-for="el in images" :key="el" @click="handleSelectImage(el)">
        <img class="w-full h-full" :src="el" alt="to_do_icon">
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
 //ul {
 //  --width: 35px;
 //  --height: 35px;
 //  padding: 5px;
 //  width: calc(var(--width) * 5);
 //
 //  li {
 //    width: var(--width);
 //    height: var(--height);
 //  }
 //}
</style>