<script setup lang="ts">
import { onUnmounted, ref } from 'vue'

const row = ref(1)
const timer = setInterval(() => {
  row.value++
}, 1000)
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div v-clamp="row" class="w-30 bg-amber lh-10 transition-all-300">
    这是一个响应式的多行文本截断指令，默认显示1行文本，可以通过clamp指令的value属性来控制显示的最大行数。
  </div>
</template>

<style scoped>

</style>
