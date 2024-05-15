import type { DirectiveBinding, ObjectDirective } from 'vue'

const focus: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value && el.focus)
      el.focus()
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value && el.focus)
      el.focus()
  },
}

export default focus
