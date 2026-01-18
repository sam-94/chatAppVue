<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <button class="logout-btn" @click="handleLogout">
        Logout
      </button>
    </div>

    <!-- Content -->
    <div class="dashboard-content">
      <div class="welcome-card">
        <h2>Welcome 👋</h2>
        <p>
          Logged in as
          <strong>{{ auth.user?.name }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth.store'
import '@/assets/dashboard.css'
import { authService } from '@/services/auth.service'
import { useRouter } from 'vue-router'
import { successToast } from '@/utils/toast'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authService.logout(auth.user.id)
  auth.logout()
  router.push('/login').then(() => {
    successToast('Logged out successfully')
  })
}
</script>