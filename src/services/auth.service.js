import api from '@/services/api'

export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  refresh: (refreshToken) => api.post('/auth/refresh', { token: refreshToken }),
  logout: (userId) => api.post('/auth/logout', {userId})
}