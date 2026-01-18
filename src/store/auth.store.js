import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),
  actions: {
    setAuth(data) {
      this.user = {
        id: data.id,
        name: data.name,
        email: data.email,
      }

      this.accessToken = data.accessToken
      this.refreshToken = data.refreshToken
      this.isAuthenticated = true

      // persist
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(this.user))
    },
    
    restore() {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const user = localStorage.getItem('user')

      if (accessToken && user) {
        this.accessToken = accessToken
        this.refreshToken = refreshToken
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    },

    logout() {
      localStorage.clear()
      this.user = null
      this.isAuthenticated = false
      window.location.href = '/login'
    },
  }
})