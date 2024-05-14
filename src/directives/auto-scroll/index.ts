import type { Directive, DirectiveBinding } from 'vue'
import type { AutoScrollOption } from '../../types/optionTypes'

type Direction = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT'
type Node = {
  maxScrollHeight: number
  maxScrollWidth: number
  element: Element
  direction: Direction
  animFrame?: number
} & AutoScrollOption

const nodes: Map<Element, Node> = new Map()

function run(node: Node) {
  if (!node.disable)
    window.requestAnimationFrame(timeStamp => scroll(node, timeStamp))
}

function scroll(node: Node, timeStamp: number, startTimeStamp: number = 0) {
  if (canBack(node))
    window.requestAnimationFrame(timeStamp => back(node, timeStamp))

  if (timeStamp - startTimeStamp >= 16.7) {
    changeScroll(node)
    startTimeStamp = timeStamp
  }
  nodes.get(node.element)!.animFrame = window.requestAnimationFrame(timeStamp =>
    scroll(node, timeStamp, startTimeStamp),
  )
}

function canBack(node: Node) {
  switch (node.direction) {
    case 'BOTTOM':
      return node.element.scrollTop === node.maxScrollHeight
    case 'TOP':
      return node.element.scrollTop === 0
    case 'RIGHT':
      return node.element.scrollLeft === node.maxScrollWidth
    case 'LEFT':
      return node.element.scrollLeft === 0
  }
}

function isScrolledToStart(node: Node): boolean {
  switch (node.direction) {
    case 'TOP':
      return node.element.scrollTop >= node.maxScrollHeight - getScrollNum(node.speed!)
    case 'LEFT':
      return node.element.scrollLeft >= node.maxScrollWidth - getScrollNum(node.speed!)
    case 'BOTTOM':
      return node.element.scrollTop <= getScrollNum(node.speed!)
    case 'RIGHT':
      return node.element.scrollLeft <= getScrollNum(node.speed!)
  }
}

function back(node: Node, timeStamp: number, startTimeStamp: number = 0) {
  if (!isScrolledToStart(node)) {
    if (timeStamp - startTimeStamp >= 16.7) {
      changeReverseScroll(node)
      startTimeStamp = timeStamp
    }
    window.requestAnimationFrame(timeStamp => back(node, timeStamp, startTimeStamp))
  }
}

/**
 * 根据指定的速度和方向改变节点的滚动位置。
 * @param node 表示要进行滚动操作的DOM节点的对象。
 */
function changeScroll(node: Node) {
  switch (node.direction) {
    case 'TOP':
      node.element.scrollBy(0, -getScrollNum(node.speed!))
      break
    case 'BOTTOM':
      node.element.scrollBy(0, getScrollNum(node.speed!))
      break
    case 'LEFT':
      node.element.scrollBy(-getScrollNum(node.speed!), 0)
      break
    case 'RIGHT':
      node.element.scrollBy(getScrollNum(node.speed!), 0)
      break
  }
}

function changeReverseScroll(node: Node) {
  switch (node.direction) {
    case 'TOP':
      node.element.scrollBy(0, getScrollNum(node.backSpeed!))
      break
    case 'BOTTOM':
      node.element.scrollBy(0, -getScrollNum(node.backSpeed!))
      break
    case 'LEFT':
      node.element.scrollBy(getScrollNum(node.backSpeed!), 0)
      break
    case 'RIGHT':
      node.element.scrollBy(-getScrollNum(node.backSpeed!), 0)
      break
  }
}

function getScrollNum(speed: Node['speed']) {
  return Math.max(Number.parseFloat((speed! / window.devicePixelRatio).toFixed(2)), 1)
}

/**
 * 更新或创建与给定HTMLElement关联的Node信息。
 * @param element - 需要更新信息的HTMLElement对象。
 * @param binding
 * @returns 返回与该HTMLElement关联的Node对象。
 */
function updateInfo(element: HTMLElement, binding: DirectiveBinding<AutoScrollOption & { arg: Direction }>): Node {
  nodes.set(element, {
    element,
    maxScrollHeight: element.scrollHeight - element.clientHeight,
    maxScrollWidth: element.scrollWidth - element.clientWidth,
    direction: binding.arg as Direction,
    speed: binding.value?.speed || 50,
    backSpeed: binding.value?.backSpeed || 1,
    disable: binding.value?.disable || false,
  })
  return nodes.get(element) as Node
}

const autoScroll: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<AutoScrollOption & { arg: Direction }>) => {
    binding.arg === undefined && (binding.arg = 'BOTTOM')
    if (!['TOP', 'BOTTOM', 'LEFT', 'RIGHT'].includes(binding.arg))
      throw new Error('Invalid arg')

    const node = updateInfo(el, binding)
    run(node)
  },
  updated: (el, binding: DirectiveBinding<AutoScrollOption & { arg: Direction }>) => {
    window.cancelAnimationFrame(nodes.get(el)!.animFrame!)
    binding.arg === undefined && (binding.arg = 'BOTTOM')
    if (!['TOP', 'BOTTOM', 'LEFT', 'RIGHT'].includes(binding.arg))
      throw new Error('Invalid arg')

    run(updateInfo(el, binding))
  },
  beforeUnmount: (el: HTMLElement) => {
    window.cancelAnimationFrame(nodes.get(el)!.animFrame!)
  },
}
export default autoScroll
