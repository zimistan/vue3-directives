import type { DefaultTheme } from 'vitepress'

export const config: DefaultTheme.Config = {
  nav: [
    { text: '主页', link: '/' },
    { text: '指南', link: '/zh-cn/guide' },
    { text: '指令', link: '/directives' },
  ],
  sidebar: [
    {
      text: '指南',
      items: [
        { text: '什么是Vue3 Directives?', link: '/zh-cn/guide' },
        { text: '快速开始', link: '/zh-cn/guide' },
        { text: '所有指令', link: '/zh-cn/guide' },
        { text: '更新状态', link: '/zh-cn/guide' },
      ],
    },
    {
      text: '指令',
      items: [
        { text: 'v-autoScroll', link: '/zh-cn/directives/autoScroll' },
        { text: 'v-clamp', link: '/zh-cn/directives/clamp' },
        { text: 'v-clipBoard', link: '/zh-cn/directives/clipBoard' },
        { text: 'v-eventOutside', link: '/zh-cn/directives/eventOutside' },
        { text: 'v-focus', link: '/zh-cn/directives/focus' },
      ],
    },
  ],
}
