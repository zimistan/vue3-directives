import type { DirectiveBinding, ObjectDirective } from 'vue'

const clamp: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const lines = Number.parseInt(binding.value, 10) || 1
    // 等待DOM更新
    // 计算行高
    const lineHeight = Number.parseInt(window.getComputedStyle(el).lineHeight, 10)
    // 计算最大高度
    const maxHeight = lineHeight * lines

    // 设置最大高度
    el.style.maxHeight = `${maxHeight}px`
    // 添加省略号样式
    el.style.overflow = 'hidden'
    el.style.textOverflow = 'ellipsis'
    el.style.display = '-webkit-box'
    el.style.webkitBoxOrient = 'vertical'
    el.style.webkitLineClamp = String(lines)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const lines = Number.parseInt(binding.value, 10) || 1
    // 等待DOM更新
    // 计算行高
    const lineHeight = Number.parseInt(window.getComputedStyle(el).lineHeight, 10)
    // 计算最大高度
    const maxHeight = lineHeight * lines
    // 设置最大高度
    el.style.maxHeight = `${maxHeight}px`
    // 添加省略号样式
    el.style.webkitLineClamp = String(lines)
  },
}

export default clamp
