import type { App } from 'vue'
import type { DirectiveType } from '../types/directive.ts'
import autoScroll from './auto-scroll/index.ts'
import eventOutside from './event-outside'

const directives: DirectiveType = {
  autoScroll,
  eventOutside,
}
export default {
  install(app: App<Element>) {
    for (const key in directives)
      app.directive(key, directives[key as keyof DirectiveType])
  },
}
