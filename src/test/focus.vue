<script setup lang="ts">
import { ref } from 'vue'

const isFocus = ref(true)
</script>

<template>
  <div>
    <input v-focus="isFocus" type="text" value="hello world!" @blur="isFocus = false">
    <button @click="isFocus = true">
      Focus it!!!
    </button>
  </div>
</template>

<style scoped>
</style>
