import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import App from './App.vue'
import vue3Directives from './directives/index.ts'

const app = createApp(App)
app.use(vue3Directives)
app.mount('#app')
