import type { DirectiveBinding } from 'vue'

export interface AutoScrollOption {
  speed?: number
  backSpeed?: number
  disable?: boolean
}

export interface ClipBoardOption extends DirectiveBinding {
  value: string
  arg: 'copy' | 'cut'
  modifiers: 'click' | 'auxclick' | 'dblclick'
}
