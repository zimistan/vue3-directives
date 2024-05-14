<script setup lang="ts">
import { reactive } from 'vue'

function sayHello() {
  console.log('Hello')
}

const state = reactive({
  show: true,
  type: 'click',
})
</script>

<template>
  <div>
    <button v-if="state.show" v-eventOutside:[state.type]="sayHello">
      点击我外面即可触发
    </button>
    <button v-autoScroll v-eventOutside:[state.type]="sayHello" @click="state.type = 'auxclick'">
      关闭
    </button>
  </div>
</template>

<style scoped></style>
