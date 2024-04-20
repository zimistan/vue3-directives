import { Directive, DirectiveBinding } from "vue"

type Node = {
  element: Element
  eventType?: string
  event: () => void
}

function updateInfo(el: HTMLElement, binding: DirectiveBinding) {
  nodes.set(el, {
    element: el,
    eventType: binding.arg,
    event: binding.value,
  })
}

function handleEventOutside(node: Node, event: Function) {
  if (node.element.contains(event.target) && node.element !== event.target) {
  }
}

const nodes: Map<Element, Node> = new Map()
const eventOutside: Directive = {
  mounted: (el, binding) => {
    updateInfo(el, binding)
    el.addEventListener(binding.arg, handleEventOutside(nodes.get(el) as Node, binding.value))
  },
  updated: (el, binding) => {
    updateInfo(el, binding)
  },
}

export default eventOutside
