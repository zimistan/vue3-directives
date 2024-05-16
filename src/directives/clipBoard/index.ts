import type { ObjectDirective } from 'vue'
import type { ClipBoardOption } from '../../types/optionTypes'

const clipBoardObj = new Clipboard()

const clipBoard: ObjectDirective = {
  mounted(el: HTMLElement, binding: ClipBoardOption) {
    if (typeof binding.value !== 'string' || binding.value.length < 1)
      throw new Error('The binding value must be a non-empty string.')
    clipBoardObj.writeText('这个是复制的文本').then(() => {
    }).catch(() => {
      throw new Error('复制文本失败')
    })
  },
  updated() {
  },
}

export default clipBoard
