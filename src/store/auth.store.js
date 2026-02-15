import { defineStore } from 'pinia'

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
    setAccessToken(token) { 
      this.accessToken = token 
      localStorage.setItem('accessToken', token) 
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
      localStorage.removeItem('accessToken') 
      localStorage.removeItem('refreshToken') 
      localStorage.removeItem('user')
      this.user = null
      this.accessToken = null 
      this.refreshToken = null
      this.isAuthenticated = false
    },
  },
  getters: { 
    isLoggedIn: (state) => state.isAuthenticated && !!state.accessToken, 
  }
})