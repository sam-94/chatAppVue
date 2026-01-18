import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import 'vue3-toastify/dist/index.css'
import '@/assets/chat.css'
import { useAuthStore } from '@/store/auth.store'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
app.use(router)

const authStore = useAuthStore(pinia)
authStore.restore()

app.mount('#app')