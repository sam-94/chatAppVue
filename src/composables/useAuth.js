import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { successToast, errorToast } from '@/utils/toast'

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
      return successToast('Login successful')
    } catch (e) {
      errorToast(e.response?.data.error || 'Login failed')
    } finally {
      loading.value = false
    }
  }

  return { loading, error, login }
}