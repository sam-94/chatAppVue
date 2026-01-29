<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth.store'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'
import { successToast } from '@/utils/toast'
import { confirmLogout } from '@/utils/alert'

const auth = useAuthStore()
const router = useRouter()


const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

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
  <header class="mobile-header">
  <button class="menu-btn" @click="toggleSidebar">☰</button>
  <!-- <span class="title">{{ auth.user.name }}</span> -->
</header>

<div
  v-if="isSidebarOpen"
  class="overlay"
  @click="toggleSidebar"
></div>

<aside :class="['sidebar', { open: isSidebarOpen }]">

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