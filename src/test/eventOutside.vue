<script setup>
function seyHello(text, h) {
  console.log(text, h)
}

document.addEventListener("click", seyHello.bind(this, "hahahaha"))
setTimeout(() => {
  document.removeEventListener("click", seyHello)
  console.log("time out")
}, 5000)
</script>

<template>
  <div>
    <button>点击我外面即可触发</button>
  </div>
</template>

<style scoped></style>
