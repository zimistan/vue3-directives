import { Directive, DirectiveBinding } from "vue"
import { AutoScrollOption } from "../../types/optionTypes"

type Direction = "TOP" | "BOTTOM" | "LEFT" | "RIGHT"
type Node = {
  maxScrollHeight: number
  maxScrollWidth: number
  element: Element
  direction: Direction
} & AutoScrollOption

function run(node: Node) {
  window.requestAnimationFrame((timeStamp) => scroll(node, timeStamp))
}

function scroll(node: Node, timeStamp: number, startTimeStamp: number = 0) {
  if (canBack(node)) {
    window.requestAnimationFrame((timeStamp) => back(node, timeStamp))
  }
  if (timeStamp - startTimeStamp >= 16.7) {
    changeScroll(node)
    startTimeStamp = timeStamp
  }
  window.requestAnimationFrame((timeStamp) => scroll(node, timeStamp, startTimeStamp))
}

function canBack(node: Node) {
  switch (node.direction) {
    case "BOTTOM":
      return node.element.scrollTop === node.maxScrollHeight
    case "TOP":
      return node.element.scrollTop === 0
    case "RIGHT":
      return node.element.scrollLeft === node.maxScrollWidth
    case "LEFT":
      return node.element.scrollLeft === 0
  }
}

function isScrolledToStart(node: Node): boolean {
  switch (node.direction) {
    case "TOP":
      return node.element.scrollTop >= node.maxScrollHeight - 5
    case "LEFT":
      return node.element.scrollLeft >= node.maxScrollWidth - 5
    case "BOTTOM":
      return node.element.scrollTop <= 5
    case "RIGHT":
      return node.element.scrollLeft <= 5
  }
}

function back(node: Node, timeStamp: number, startTimeStamp: number = 0) {
  if (!isScrolledToStart(node)) {
    if (timeStamp - startTimeStamp >= 16.7) {
      changeReverseScroll(node)
      startTimeStamp = timeStamp
    }
    window.requestAnimationFrame((timeStamp) => back(node, timeStamp, startTimeStamp))
  }
}

/**
 * 根据指定的速度和方向改变节点的滚动位置。
 * @param node 表示要进行滚动操作的DOM节点的对象。
 */
const changeScroll = (node: Node) => {
  switch (node.direction) {
    case "TOP":
      node.element.scrollTop -= getScrollNum(node.speed!)
      break
    case "BOTTOM":
      node.element.scrollTop += getScrollNum(node.speed!)
      break
    case "LEFT":
      node.element.scrollLeft -= getScrollNum(node.speed!)
      break
    case "RIGHT":
      node.element.scrollLeft += getScrollNum(node.speed!)
      break
  }
}

function changeReverseScroll(node: Node) {
  switch (node.direction) {
    case "TOP":
      node.element.scrollTop += getScrollNum(node.backSpeed!)
      break
    case "BOTTOM":
      node.element.scrollTop -= getScrollNum(node.backSpeed!)
      break
    case "LEFT":
      node.element.scrollLeft += getScrollNum(node.backSpeed!)
      break
    case "RIGHT":
      node.element.scrollLeft -= getScrollNum(node.backSpeed!)
      break
  }
}

function getScrollNum(speed: Node["speed"]) {
  return parseFloat((speed! / window.devicePixelRatio).toFixed(2)) + 0.01
}

/**
 * 更新或创建与给定HTMLElement关联的Node信息。
 * @param element - 需要更新信息的HTMLElement对象。
 * @param binding
 * @returns 返回与该HTMLElement关联的Node对象。
 */
const updateInfo = (element: HTMLElement, binding: DirectiveBinding<AutoScrollOption & { arg: Direction }>): Node => {
  nodes.set(element, {
    element,
    maxScrollHeight: element.scrollHeight - element.clientHeight,
    maxScrollWidth: element.scrollWidth - element.clientWidth,
    direction: binding.arg as Direction,
    speed: binding.value.speed || 50,
    backSpeed: binding.value.backSpeed || 1,
  })
  return nodes.get(element) as Node
}

const nodes: Map<Element, Node> = new Map()

const autoScroll: Directive = {
  mounted: (el: HTMLElement, binding: DirectiveBinding<AutoScrollOption & { arg: Direction }>) => {
    binding.arg === undefined && (binding.arg = "BOTTOM")
    if (!["TOP", "BOTTOM", "LEFT", "RIGHT"].includes(binding.arg)) {
      console.error("Invalid arg", binding.arg)
    }
    const node = updateInfo(el, binding)
    run(node)
  },
  updated: (el, binding: DirectiveBinding) => {
    updateInfo(el, binding)
  },
}
export default autoScroll
