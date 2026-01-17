<template>
  <Loader v-if="loading" />

  <input v-model="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Password" />

  <button @click="submit">Login</button>
  <p v-if="error" style="color:red">{{ error }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Loader from '@/components/common/Loader.vue'
import { useAuthStore } from '@/store/auth.store'

const email = ref('')
const password = ref('')
const router = useRouter()
const { loading, error, login } = useAuth()

const submit = async () => {
  const success = await login({ email: email.value, password: password.value })
  console.log(11, success)
  if (success) router.push('/dashboard')
}
</script>