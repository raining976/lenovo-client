import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import store from './store'
import * as api from "@/api"

const app = createApp(App)

app.config.globalProperties.$api = api

app.use(store).use(router).mount('#app')
