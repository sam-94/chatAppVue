import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'

export function useAuth() {
  const loading = ref(false)
  const error = ref('')
  const authStore = useAuthStore()


  const login = async (data) => {
    loading.value = true
    error.value = ''
    try {
      const res = await authService.login(data)
      authStore.loginSuccess(res.data.data.accessToken)

      return true
    } catch (e) {
      console.log(e.response);
      error.value = e.response?.data.error || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  return { loading, error, login }
}