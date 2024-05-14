import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-expect-error
import eslintPlugin from 'vite-plugin-eslint'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    }),
    UnoCSS(),
  ],
  resolve: {},
})
