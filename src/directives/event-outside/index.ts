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

function documentEvent(event: MouseEvent) {
  documentMouseEvents[event.type as DocumentMouseEventsKeys].forEach((node) => {
    if (!node.element.contains(event.target as HTMLElement)) {
      node.event()
    }
  })
}

// 给Document添加事件
function addDocumentEvents(type: DocumentMouseEventsKeys) {
  if (documentMouseEvents[type].size === 0) {
    document.addEventListener(type, documentEvent)
  }
}

function removeDocumentEvents(type: DocumentMouseEventsKeys) {
  if (documentMouseEvents[type].size === 0) {
    document.removeEventListener(type, documentEvent)
  }
}

const eventOutside: ObjectDirective = {
  mounted: (el, binding) => {
    if (binding.arg) {
      // 确保 binding.arg 是 DocumentMouseEvents 的一个键
      if (!((binding.arg as DocumentMouseEventsKeys) in documentMouseEvents)) {
        throw new Error("eventOutside: binding.arg is not a valid event type")
      }
    } else {
      binding.arg = "click"
    }
    addDocumentEvents(binding.arg as DocumentMouseEventsKeys)
    let node: Node | undefined = documentMouseEvents[binding.arg as DocumentMouseEventsKeys].get(el)
    if (!node) {
      node = {
        element: el,
        eventType: binding.arg,
        event: binding.value,
      }
    }
    documentMouseEvents[binding.arg as DocumentMouseEventsKeys].set(el, node)
  },
  updated: (el, binding) => {
    if (binding.arg) {
      // 确保 binding.arg 是 DocumentMouseEvents 的一个键
      if (!((binding.arg as DocumentMouseEventsKeys) in documentMouseEvents)) {
        throw new Error("eventOutside: binding.arg is not a valid event type")
      }
    } else {
      binding.arg = "click"
    }
    // addDocumentEvents(binding.arg as DocumentMouseEventsKeys)

    if (binding.arg === documentMouseEvents[])
  },
  unmounted: (el, binding) => {
    if (documentMouseEvents[binding.arg as DocumentMouseEventsKeys].size === 1) {
      document.removeEventListener(
        binding.arg as DocumentMouseEventsKeys,
        documentMouseEvents[binding.arg as DocumentMouseEventsKeys].get(el)!.listener
      )
    }
    documentMouseEvents[binding.arg as DocumentMouseEventsKeys].delete(el)
  },
}

export default eventOutside
