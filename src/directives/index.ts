import type { App } from 'vue'
import type { DirectiveType } from '../types/directive.ts'
import autoScroll from './auto-scroll/index.ts'
import eventOutside from './event-outside'
import focus from './focus'
import clipBoard from './clipBoard'
import clamp from './clamp'

const directives: DirectiveType = {
  autoScroll,
  eventOutside,
  focus,
  clipBoard,
  clamp,
}

export default {
  install(app: App<Element>) {
    for (const key in directives)
      app.directive(key, directives[key as keyof DirectiveType])
  },
}
