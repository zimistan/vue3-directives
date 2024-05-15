<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { AutoScrollOption } from '../types/optionTypes'

const num = ref(100)
onMounted(() => {})
const autoScrollOption = ref<AutoScrollOption>({
  speed: 1,
  backSpeed: 30,
})

const dicoration = ref('BOTTOM')

function onClick() {
  autoScrollOption.value = {
    speed: 100,
    backSpeed: 30,
  }
}
</script>

<template>
  <div class="flex gap-xl">
    <ul
      v-autoScroll:[dicoration]="autoScrollOption"
      class="h-xl w-50 overflow-y-scroll bg-red"
    >
      <li v-for="item in num" :key="item" class="m-r">
        {{ item }}
      </li>
    </ul>
    <button @click="onClick">
      点击
    </button>
  </div>
</template>

<style scoped></style>
