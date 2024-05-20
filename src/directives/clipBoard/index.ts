import type { ObjectDirective } from 'vue'

interface CopyElementMap {
  sync: boolean | undefined
  value: string
  type: 'text' | 'image'
}

const copyElementMap: Map<HTMLElement, CopyElementMap> = new Map()
const clipBoardObj = navigator.clipboard

function onCopy() {
  const copyElement = copyElementMap.get(this)!
  if (!copyElement.sync) {
    clipBoardObj.writeText(copyElement.value).then(() => {

    })
  }
}

const clipBoard: ObjectDirective = {
  mounted(el: HTMLElement, binding) {
    if (typeof binding.value !== 'string' || binding.value.length < 1)
      throw new Error('The binding value must be a non-empty string.')
    copyElementMap.set(el, {
      sync: binding.modifiers.sync,
      value: binding.value,
      type: 'text',
    })
    el.addEventListener('click', onCopy)
  },
  updated() {
  },
}

export default clipBoard
