import { defineConfig } from 'vitepress'
import { config as zhCnConfig } from '../zh-cn/config'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue3 Directives',
  description: '高性能的Vue3指令库',
  srcDir: './',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/guide' },
      { text: '指令', link: '/directives' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/zimistan/vue3-directives' },
    ],
  },
  locales: {
    root: {
      label: '中文',
      lang: 'zh-cn',
      link: '/zh-cn',
      themeConfig: zhCnConfig,
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en',
    },
  },
})
