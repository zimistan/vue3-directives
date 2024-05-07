<script setup lang="ts">
import { ref } from "vue"
import { AutoScrollOption } from "../types/optionTypes/index"

let num = ref(100)
const autoScrollOption = ref<AutoScrollOption>({
  speed: 1,
  backSpeed: 30,
})

const dicoration = ref("BOTTOM")

function onClick() {
  autoScrollOption.value = {
    speed: 2,
    backSpeed: 30,
  }
}
</script>

<template>
  <div class="flex gap-xl">
    <ul v-autoScroll:[dicoration]="autoScrollOption" class="bg-red w-50 h-xl overflow-y-scroll">
      <li class="m-r" v-for="item in num" :key="item">{{ item }}</li>
    </ul>
    <button @click="onClick">点击</button>
  </div>
</template>

<style scoped></style>
