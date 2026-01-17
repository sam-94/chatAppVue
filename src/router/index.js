import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuthStore } from '@/store/auth.store'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { 
    path: '/login', 
    component: LoginView,
    meta: { guestOnly: true } 
  },
  { 
    path: '/register',
    component: RegisterView,
    meta: { guestOnly: true }  
  },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) next('/login')
  else if (to.meta.guestOnly && auth.isLoggedIn) next('/dashboard')
  else next()
})

export default router