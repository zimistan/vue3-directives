<script setup>
function sayHello() {
  console.log("Hello")
}
</script>

<template>
  <div>
    <button v-event-outside="sayHello">点击我外面即可触发</button>
  </div>
</template>

<style scoped></style>
