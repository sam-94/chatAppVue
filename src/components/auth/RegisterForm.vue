<template>
  <Loader v-if="loading" />
  <div class="auth-container">
    <div class="auth-card">
      <h2>Create account</h2>
      <p>Sign up to get started</p>

      <form @submit.prevent="handleSignup">
        <div class="input-group">
          <input type="text" placeholder="Name" v-model="name" />
          <!-- <div v-if="errors.name" class="error">{{ errors.name }}</div> -->
        </div>

        <div class="input-group">
          <input type="email" placeholder="Email" v-model="email" />
          <!-- <div v-if="errors.email" class="error">{{ errors.email }}</div> -->
        </div>

        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" />
          <!-- <div v-if="errors.password" class="error">{{ errors.password }}</div> -->
        </div>
         <div class="input-group">
          <input type="password" placeholder="Confirm Password" v-model="confirm_password" />
          <!-- <div v-if="errors.password" class="error">{{ errors.password }}</div> -->
        </div>

        <button type="submit">Sign up</button>
      </form>

      <div class="switch">
        Already have an account?
        <router-link to="/login">Login</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const router = useRouter()
const { loading, register } = useAuth()

const handleSignup = async () => {
    if (!name.value) {
        return warningToast('Name is required')
    }
    if (!email.value) {
        return warningToast('Email is required')
    }
    if (!password.value) {
        return warningToast('Password is required')
    }
    if (password.value !== confirm_password.value) {
        return warningToast('Passwords do not match')
    }
    const success = await register({ name: name.value, email: email.value, password: password.value })
    if (success) router.push('/dashboard')
}
</script>