import { loginApi, registerApi } from '@/api/auth'

export const authService = {
  login: (data) => loginApi(data),
  register: (data) => registerApi(data)
}