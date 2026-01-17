import api from './index'

export const loginApi = (data) => api.post('/auth/login', data)
export const registerApi = (data) => api.post('/register', data)