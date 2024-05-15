# autoScroll

高性能的自动滚动指令，可实现上、下、左、右方向的滚动，并且支持滚动速度的调整与暂停滚动。

## value

|    参数     | 类型      | 是否必填 |  默认   |    说明    |
|:---------:|---------|:----:|:-----:|:--------:|
|   speed   | number  |  否   |   1   |   滚动速度   |
| backSpeed | number  |  否   |  50   | 返回时的滚动速度 |
|  disable  | boolean |  否   | false |    禁用    |

## args

元素滚动的方向，具体参数如下：

- BOTTOM：向下滚动
- TOP：向上滚动
- RIGHT：向右滚动
- LEFT：向左滚动

## 示例

```vue

<script setup lang="ts">
  import { ref } from "vue"
  //...
  import type { AutoScrollOption } from '@/types/optionTypes'

  const autoScrollOption = ref<AutoScrollOption>({
    speed: 1,
    backSpeed: 30,
    disable: false,
  })
  //...
</script>
<template>
  <div>
    <ul style="height:100px;" v-autoScroll:BOTTOM="autoScrollOption">
      <li v-for="item in 100" :key="item">
        滚动中。。。
      </li>
    </ul>
  </div>
</template>
```
