import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { errorToast } from '@/utils/toast'

export function useAuth() {
  const loading = ref(false)
  const authStore = useAuthStore()

  const login = async (data) => {
    loading.value = true
    try {
      const res = await authService.login(data)
      authStore.setAuth(res.data.data)
      return true
    } catch (e) {
      errorToast(e.response?.data.error || 'Login failed')
    } finally {
      loading.value = false
    }
  }

  const register = async (data) => {
    loading.value = true
    try {
      const res = await authService.register(data)
      authStore.setAuth(res.data.data)
      return true
    } catch (e) {
      errorToast(e.response?.data.error || 'Regisration failed')
    } finally {
      loading.value = false
    }
  }

  return { loading, login, register }
}