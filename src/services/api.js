import axios from 'axios'
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (!navigator.onLine) {
    throw new Error('No internet connection')
  }
  return config
})

api.interceptors.response.use(
  res => res,
  async err => {
    const authStore = useAuthStore();
    const originalRequest = err.config;

    // Check for 401 Unauthorized
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      try {
        const refreshToken = authStore.refreshToken;
        if (!refreshToken) {
          authStore.logout();
          return Promise.reject(err);
        }

        // Call refresh API
        const res = await authService.refresh(refreshToken);
        const newAccessToken = res.data.data.accessToken;
        
        // Save new token
        authStore.setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshErr) {
        authStore.logout();
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);


export default api