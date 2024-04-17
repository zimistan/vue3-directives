import { Directive } from "vue"

type Node = {
  maxScrollHeight: number
  maxScrollWidth: number
  element: Element
  direction: Direction
  speed: number
  backSpeed: number
}

const enum Direction {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

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
    case Direction.BOTTOM:
      return node.element.scrollTop === node.maxScrollHeight
    case Direction.TOP:
      return node.element.scrollTop === 0
    case Direction.RIGHT:
      return node.element.scrollLeft === node.maxScrollWidth
    case Direction.LEFT:
      return node.element.scrollLeft === 0
  }
}

function isScrolledToStart(node: Node): boolean {
  switch (node.direction) {
    case Direction.TOP:
      return node.element.scrollTop >= node.maxScrollHeight - 5
    case Direction.LEFT:
      return node.element.scrollLeft >= node.maxScrollWidth - 5
    case Direction.BOTTOM:
      return node.element.scrollTop <= 5
    case Direction.RIGHT:
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
 * @param speed 滚动的速度，默认为1。
 * @param direction 滚动的方向，由Direction枚举类型指定。
 */
const changeScroll = (node: Node) => {
  switch (node.direction) {
    case Direction.TOP:
      node.element.scrollTop -= getScrollNum(node.speed)
      break
    case Direction.BOTTOM:
      node.element.scrollTop += getScrollNum(node.speed)
      break
    case Direction.LEFT:
      node.element.scrollLeft -= getScrollNum(node.speed)
      break
    case Direction.RIGHT:
      node.element.scrollLeft += getScrollNum(node.speed)
      break
  }
}

function changeReverseScroll(node: Node) {
  switch (node.direction) {
    case Direction.TOP:
      node.element.scrollTop += getScrollNum(node.backSpeed)
      break
    case Direction.BOTTOM:
      node.element.scrollTop -= getScrollNum(node.backSpeed)
      break
    case Direction.LEFT:
      node.element.scrollLeft += getScrollNum(node.backSpeed)
      break
    case Direction.RIGHT:
      node.element.scrollLeft -= getScrollNum(node.backSpeed)
      break
  }
}

function getScrollNum(speed: Node["speed"]) {
  return parseFloat((speed / window.devicePixelRatio).toFixed(2)) + 0.01
}

/**
 * 更新或创建与给定HTMLElement关联的Node信息。
 * @param element - 需要更新信息的HTMLElement对象。
 * @returns 返回与该HTMLElement关联的Node对象。
 */
const updateInfo = (element: HTMLElement): Node => {
  const node = nodes.get(element)
  if (node) {
    node.element = element
    node.maxScrollHeight = element.scrollHeight - element.clientHeight
    node.maxScrollWidth = element.scrollWidth - element.clientWidth
    node.direction = Direction.TOP
    node.speed = 1
    node.backSpeed = 50
  } else {
    nodes.set(element, {
      element,
      maxScrollHeight: element.scrollHeight - element.clientHeight,
      maxScrollWidth: element.scrollWidth - element.clientWidth,
      direction: Direction.TOP,
      speed: 1,
      backSpeed: 50,
    })
  }
  return nodes.get(element) as Node
}

const nodes: Map<Element, Node> = new Map()
const autoScroll: Directive = {
  mounted: (el: HTMLElement) => {
    const node = updateInfo(el)
    run(node)
  },
  updated: (el) => {
    updateInfo(el)
  },
}
export default autoScroll
