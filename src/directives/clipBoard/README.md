# clipBoard

点击元素时将指令的值保存到粘贴板

## value

接收`string`类型的值，当点击元素时将内容保存到粘贴板。

## 示例

```vue

<template>
  <div>
    <button v-clip-board="'https://github.com/zimistan/vue3-directives'">点击复制</button>
  </div>
</template>
```