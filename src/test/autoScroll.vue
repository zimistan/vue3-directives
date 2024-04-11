<script setup lang="ts">
import { ref } from "vue"

let num = ref(100)
</script>

<template>
  <div class="flex gap-xl">
    <ul v-autoScroll class="bg-red w-50 h-xl overflow-y-scroll">
      <li v-for="item in num" :key="item">{{ item }}</li>
    </ul>
    <ul v-autoScroll class="bg-red w-50 h-xl overflow-y-scroll">
      <li v-for="item in 100" :key="item">{{ item }}</li>
    </ul>
    <button @click="num++">点击</button>
  </div>
</template>

<style scoped></style>
