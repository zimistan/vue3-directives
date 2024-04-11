import { Directive } from "vue"

type Node = {
  clientHeight: number
  scrollHeight: number
  element: Element
  startTimeStamp?: number
}

const run = (node: Node, timeStamp: number) => {
  if (node.scrollHeight <= node.element.scrollTop + node.clientHeight) {
    console.log("2")
  } else {
    if (!node.startTimeStamp) {
      node.startTimeStamp = timeStamp
    }
    if (timeStamp - node.startTimeStamp >= 24) {
      changeScroll(node)
      node.startTimeStamp = timeStamp
    }

    window.requestAnimationFrame((timeStamp) => run(node, timeStamp))
  }
}

const changeScroll = (node: Node) => {
  node.element.scrollTop += 1
}

const updateInfo = (element: HTMLElement): Node => {
  const node = nodes.get(element)
  if (node) {
    node.element = element
    node.scrollHeight = element.scrollHeight
    node.clientHeight = element.clientHeight
  } else {
    nodes.set(element, {
      element,
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
    })
  }
  return nodes.get(element) as Node
}

const nodes: Map<Element, Node> = new Map()
const autoScroll: Directive = {
  mounted: (el: HTMLElement) => {
    const node = updateInfo(el)
    window.requestAnimationFrame((timeStamp) => run(node, timeStamp))
    console.log(node)
  },
  updated: (el) => {
    updateInfo(el)
  },
}
export default autoScroll
