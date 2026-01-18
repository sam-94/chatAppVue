import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import NotFound from '@/views/NotFound.vue'
import Offline from '@/views/Offline.vue'
import { useAuthStore } from '@/store/auth.store'

const routes = [
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
    path: '/',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/offline',
    name: 'Offline',
    component: Offline,
  },
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) next('/login')
  else if (to.meta.guestOnly && auth.isAuthenticated) next('/')
  else next()
})

export default router