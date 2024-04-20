import { ObjectDirective } from "vue"

type Node = {
  element: Element
  eventType?: string
  event: () => void
}

interface DocumentMouseEvents {
  auxclick: Map<HTMLElement, Node>
  click: Map<HTMLElement, Node>
  contextmenu: Map<HTMLElement, Node>
  dblclick: Map<HTMLElement, Node>
  mousedown: Map<HTMLElement, Node>
  mouseenter: Map<HTMLElement, Node>
  mouseleave: Map<HTMLElement, Node>
  mousemove: Map<HTMLElement, Node>
  mouseover: Map<HTMLElement, Node>
  mouseout: Map<HTMLElement, Node>
  mouseup: Map<HTMLElement, Node>
}

type DocumentMouseEventsKeys = keyof DocumentMouseEvents

const documentMouseEvents: DocumentMouseEvents = {
  auxclick: new Map(),
  click: new Map(),
  contextmenu: new Map(),
  dblclick: new Map(),
  mousedown: new Map(),
  mouseenter: new Map(),
  mouseleave: new Map(),
  mousemove: new Map(),
  mouseover: new Map(),
  mouseout: new Map(),
  mouseup: new Map(),
}
const eventOutside: ObjectDirective = {
  mounted: (el, binding) => {
    if (binding.arg) {
      // 确保 binding.arg 是 DocumentMouseEvents 的一个键
      if (!((binding.arg as DocumentMouseEventsKeys) in documentMouseEvents)) {
        throw new Error("必须传递一个有效的事件名称")
      }
    }
    if (documentMouseEvents[binding.arg as DocumentMouseEventsKeys].size === 0) {
      document.addEventListener(binding.arg as DocumentMouseEventsKeys, (event) => {
        console.log(event)
      })
    }
    if (!documentMouseEvents[binding.arg as DocumentMouseEventsKeys].has(el)) {
      documentMouseEvents[binding.arg as DocumentMouseEventsKeys].set(el, {
        element: el,
        eventType: binding.arg,
        event: binding.value,
      })
    }
  },
}

export default eventOutside
