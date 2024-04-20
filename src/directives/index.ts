import { App } from "vue"
import autoScroll from "./auto-scroll/index.ts"
import eventOutside from "./event-outside"
import { DirectiveType } from "../types/directive.ts"

const directives: DirectiveType = {
  autoScroll,
  eventOutside,
}
export default {
  install(app: App<Element>) {
    for (const key in directives) {
      app.directive(key, directives[key as keyof DirectiveType])
    }
  },
}
