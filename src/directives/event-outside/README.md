# eventOutside

元素外部触发事件，类似于`click-outside`，扩展了其他鼠标事件。

## value

接受一个函数，`event-outside`触发时调用该函数。

## args

鼠标事件，具体参数如下，默认`click`：
`auxclick` `click` `contextmenu` `dblclick` `mousedown` `mouseenter` `mouseleave` `mousemove` `mouseover` `mouseout` `mouseup`

## 示例

```vue
<script setup lang="ts">
function sayHello() {
  console.log('hello world!!!')
}
</script>

<template>
  <div>
    <button v-eventOutside:auxclick="sayHello">
      点击我外面即可触发
    </button>
  </div>
</template>
```
