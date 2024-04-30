<script setup lang="ts">
import { ref } from "vue"
import { AutoScrollOption } from "../types/optionTypes/index"

let num = ref(100)
const autoScrollOption = ref<AutoScrollOption>({
  speed: 1,
  backSpeed: 30,
})
</script>

<template>
  <div class="flex gap-xl">
    <ul v-autoScroll:BOTTOM="autoScrollOption" class="bg-red w-50 h-xl overflow-y-scroll">
      <li class="m-r" v-for="item in num" :key="item">{{ item }}</li>
    </ul>
    <button @click="num++">点击</button>
  </div>
</template>

<style scoped></style>
