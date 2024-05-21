<script setup lang="ts">
import { ref } from 'vue'

const copyText = ref<number>(Math.random() * 100)
</script>

<template>
  <div>
    <button v-clip-board="copyText">
      点击复制
    </button>
  </div>
</template>

<style scoped></style>
