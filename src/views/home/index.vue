<script setup lang="ts">

import {computed, ref} from "vue";
import qyList from '@c/list.vue'
import todoList from '../todo/list.vue'
// import notification from '@c/notification.vue'
const keyword = ref('')
const placeholder = computed(() => !keyword.value ? 'Hi' : '')

//
const msg = ref('');
function sendMessage() {
  msg.value = 'Hello World'
  setTimeout(() => {
    msg.value = ''
  }, 2000)
}
</script>

<template>
  <div class="page-home relative w-full h-full">
    <div class="home">
<!--      <header class="w-full drag">-->
<!--        <el-input v-model.trim="keyword" class="keyword caret-pink-500 h-[50px] !border-0 text-white" :placeholder="placeholder"/>-->
<!--      </header>-->
      <main class="content">
<!--        <div class="">-->
<!--          <h6 class="text-white">最近使用</h6>-->
<!--          <qy-list />-->
<!--        </div>-->
        <todo-list></todo-list>
      </main>

    </div>
    <footer @click="sendMessage"></footer>
    <!--    <notification :msg="msg"/>-->
  </div>
</template>

<style scoped lang="less">

.page-home {
  .home {
    --p: 10px;
    //background-color: rgba(188, 82, 243, 0.81);
    //background-color:  #212121; //slategray;  // #0f172a1a; //  #0f172ad1;
    //background: linear-gradient(170deg, rgba(58, 56, 56, 0.623) 0%, rgb(31, 31, 31) 100%);
    //background: linear-gradient(top right  bottom, #000, #212121);
    border-radius: 10px;
    main {
      background-color: #1c2d3d;
    }
  }
  footer {
    background-color: rgba(188, 82, 243, 0.81);
    border-radius: 5px;
    width: 30px;
    height: 10px;
    backdrop-filter: blur(10px);
    position: fixed;
    left: 50%;
    bottom: 1em;
    transform: translateX(-50%);
    transition: all .5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  footer:hover {
    width: 40px;
  }
  .keyword {
    --el-input-border-color: transparent;
  }
  .content {
    transition: all 1s ease;
  }
}




@keyframes showHome {
  0% {
    opacity: 0;

  }
  100% {
    transform: translateY(0);
  }
}
</style>