<script setup lang="ts">

import {ref, nextTick} from "vue";

const list = ref([
  { name: '微信', href: 'weixin://' },
  { name: 'sftp', href: 'qy-toolbar://' },
  { name: 'qq', href: 'qq://' },
])

function handleClick(el: HomeListItem, index: number) {
  list.value.splice(index, 1)
  list.value.unshift(el)
}
</script>

<template>
  <div>
    <transition-group tag="ul" name="add_del" class="qy-transition item-ul flex flex-wrap gap-3 py-[10px]">
      <li class="qy-transition p-[10px] overflow-hidden rounded min-h-[50px] max-h-[80px] w-[80px] flex items-center align-center justify-center text-white "
          v-for="(el, index) in list" :key="'qy-item' + index"
          :class="[{'active': !index},  `duration-${index + 1}00`]"
          @click="handleClick(el, index)">
        <span>{{ el.name }}</span>
      </li>
    </transition-group>

  </div>
</template>
<style scoped lang="less">
  .list {
    li {
      background-color: #213547;
      width: 70px;
      height: 70px;
      transition: all 1s ease-in-out;
    }
  }
</style>

<style scoped lang="less">
li {
  transition: all .5s ;
}
ul li.active, li:hover {
  background-color: rgb(248 250 252 / .1);
}

.add_del-enter-from,
.add_del-leave-to {
  width: 0;
}
.add_del-enter-active,
.add_del-leave-active {
  opacity: 0;
}


//@keyframes itemAdd {
//  0% {
//    opacity: 0;
//  }
//  100% {
//    opacity: 1;
//  }
//}
//@keyframes itemDel {
//  0% {
//    opacity: 0;
//  }
//  100% {
//    opacity: 0
//  }
//}
</style>