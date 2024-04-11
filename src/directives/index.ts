import { App } from "vue"
import autoScroll from "./auto-scroll/index.ts"
import { DirectiveType } from "../types/directive.ts"

const directives: DirectiveType = {
  autoScroll,
}
export default {
  install(app: App<Element>) {
    for (const key in directives) {
      app.directive(key, directives[key as keyof DirectiveType])
    }
  },
}
