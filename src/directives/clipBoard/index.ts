import type { DirectiveBinding, ObjectDirective } from "vue"

interface CopyElementMap {
  value: string
}

const copyElementMap: Map<HTMLElement, CopyElementMap> = new Map()

function onCopy(this: HTMLElement) {
  const copyElement = copyElementMap.get(this)!
  navigator.clipboard.writeText(copyElement.value).then().catch()
}

function initElement(el: HTMLElement, binding: DirectiveBinding<string>) {
  copyElementMap.set(el, {
    value: binding.value,
  })
  el.addEventListener("click", onCopy)
}

const clipBoard: ObjectDirective<HTMLElement, string> = {
  mounted(el, binding) {
    if (typeof binding.value !== "string" || binding.value.length < 1)
      throw new Error("The binding value must be a non-empty string.")
    initElement(el, binding)
  },
  updated(el, binding) {
    copyElementMap.set(el, { value: binding.value })
  },
  unmounted(el) {
    el.removeEventListener("click", onCopy)
  },
}

export default clipBoard
