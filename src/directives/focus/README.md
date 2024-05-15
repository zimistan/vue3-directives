# focus

元素自动获取焦点。

## value

接受一个`boolean`类型，值为`true`时获取焦点。

## 示例

```vue

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
```
