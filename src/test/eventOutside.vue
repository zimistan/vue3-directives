<script setup>
function seyHello() {
  console.log("你好")
}
</script>

<template>
  <div>
    <button v-eventOutside:click="seyHello">点击我外面即可触发</button>
  </div>
</template>

<style scoped></style>
