<script setup>
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'
import { successToast } from '@/utils/toast'
import { confirmLogout } from '@/utils/alert'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async() => {
    const result = await confirmLogout()
    if (!result.isConfirmed) return
    await authService.logout(auth.user.id)
    auth.logout()
    router.push('/login').then(() => {
    successToast('Logged out successfully')
  })
}
</script>

<template>
  <aside class="sidebar">

    <!-- Logged-in User -->
    <div class="user-card" v-if="auth.user">
      <div class="user-avatar">
        <img src="https://i.pravatar.cc/60" />
        <span class="online-dot"></span>
      </div>

      <div class="user-details">
        <h4>{{ auth.user.name }}</h4>
        <p>{{ auth.user.email }}</p>
      </div>

      <button class="logout-btn" @click="handleLogout" title="Logout">
        ⎋
      </button>
    </div>

    <!-- Search -->
    <input class="search" placeholder="Search chats..." />

    <!-- Chat list -->
    <div class="chat-item active">
      <div class="avatar">DC</div>
      <div class="chat-info">
        <h4>Design chat</h4>
        <p>Jessie Rollins sent...</p>
      </div>
      <span class="badge">1</span>
    </div>

  </aside>
</template>