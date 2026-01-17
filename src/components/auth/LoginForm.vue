<template>
  <Loader v-if="loading" />

  <input v-model="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Password" />

  <button @click="submit">Login</button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Loader from '@/components/common/Loader.vue'
import { warningToast } from '@/utils/toast'

const email = ref('')
const password = ref('')
const router = useRouter()
const { loading, login } = useAuth()

const submit = async () => {
  if (!email.value || !password.value) {
    return warningToast('Email and password are required')
  }
  const success = await login({ email: email.value, password: password.value })
  if (success) router.push('/dashboard')
}
</script>