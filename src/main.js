import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')