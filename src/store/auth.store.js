import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(!!localStorage.getItem('token'))

  const loginSuccess = (token) => {
    localStorage.setItem('token', token)
    isLoggedIn.value = true
  }

  const logout = () => {
    localStorage.removeItem('token')
    isLoggedIn.value = false
  }

  return { isLoggedIn, loginSuccess, logout }
})