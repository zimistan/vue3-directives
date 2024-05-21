import type { ObjectDirective } from 'vue'

interface Node {
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

const CUSTOM_ATTR_NAME = '_event-outside-type'

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

function handleEvents(event: MouseEvent) {
  documentMouseEvents[event.type as DocumentMouseEventsKeys].forEach((node) => {
    if (!node.element.contains(event.target as HTMLElement))
      node.event()
  })
}

function addDocumentEvents(type: DocumentMouseEventsKeys) {
  if (documentMouseEvents[type].size === 0)
    document.addEventListener(type, handleEvents)
}

function removeDocumentEvents(type: DocumentMouseEventsKeys) {
  if (documentMouseEvents[type].size === 0)
    document.removeEventListener(type, handleEvents)
}

const eventOutside: ObjectDirective = {
  mounted: (el, binding) => {
    if (binding.arg) {
      // 确保 binding.arg 是 DocumentMouseEvents 的一个键
      if (!((binding.arg as DocumentMouseEventsKeys) in documentMouseEvents))
        throw new Error('eventOutside: binding.arg is not a valid event type')
    }
    else {
      binding.arg = 'click'
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
    el.setAttribute(CUSTOM_ATTR_NAME, binding.arg)
    documentMouseEvents[binding.arg as DocumentMouseEventsKeys].set(el, node)
  },
  updated: (el, binding) => {
    if (binding.arg) {
      // 确保 binding.arg 是 DocumentMouseEvents 的一个键
      if (!((binding.arg as DocumentMouseEventsKeys) in documentMouseEvents))
        throw new Error('eventOutside: binding.arg is not a valid event type')
    }
    else {
      binding.arg = 'click'
    }
    const newNode = {
      element: el,
      eventType: binding.arg,
      event: binding.value,
    }
    if (binding.arg !== el.getAttribute(CUSTOM_ATTR_NAME)) {
      addDocumentEvents(binding.arg as DocumentMouseEventsKeys)
      removeDocumentEvents(el.getAttribute(CUSTOM_ATTR_NAME) as DocumentMouseEventsKeys)
      documentMouseEvents[el.getAttribute(CUSTOM_ATTR_NAME) as DocumentMouseEventsKeys].delete(el)
    }
    documentMouseEvents[binding.arg as DocumentMouseEventsKeys].set(el, newNode)
  },
  unmounted: (el, binding) => {
    removeDocumentEvents(el)
    documentMouseEvents[binding.arg as DocumentMouseEventsKeys].delete(el)
  },
}

export default eventOutside
