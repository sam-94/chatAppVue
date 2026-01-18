<template>
  <Loader v-if="loading" />
  <div class="auth-container">
    <div class="auth-card">
      <h2>Welcome back</h2>
      <p>Login to your account</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" placeholder="Email" v-model="email" />
          <!-- <div v-if="errors.email" class="error">{{ errors.email }}</div> -->
        </div>

        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" />
          <!-- <div v-if="errors.password" class="error">{{ errors.password }}</div> -->
        </div>

        <button type="submit">Login</button>
      </form>

      <div class="switch">
        Don’t have an account?
        <router-link to="/register">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Loader from '@/components/common/Loader.vue'
import { warningToast } from '@/utils/toast'
import '@/assets/auth.css'

const email = ref('')
const password = ref('')
const router = useRouter()
const { loading, login } = useAuth()

const handleLogin = async () => {
  if (!email.value) return warningToast('Email is required')
  if (!password.value) return warningToast('Password is required')
  const success = await login({ email: email.value, password: password.value })
  if (success) router.push('/dashboard')
}
</script>