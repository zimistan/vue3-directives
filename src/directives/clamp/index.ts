import type { DirectiveBinding, ObjectDirective } from 'vue'

const clamp: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const lines = Number.parseInt(binding.value, 10) || 1
    const lineHeight = Number.parseInt(window.getComputedStyle(el).lineHeight, 10)
    const maxHeight = lineHeight * lines
    el.style.maxHeight = `${maxHeight}px`
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    el.style.display = '-webkit-box'
    el.style.webkitBoxOrient = 'vertical'
    el.style.webkitLineClamp = String(lines)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const lines = Number.parseInt(binding.value, 10) || 1
    const lineHeight = Number.parseInt(window.getComputedStyle(el).lineHeight, 10)
    const maxHeight = lineHeight * lines
    el.style.maxHeight = `${maxHeight}px`
    el.style.webkitLineClamp = String(lines)
  },
}

export default clamp
