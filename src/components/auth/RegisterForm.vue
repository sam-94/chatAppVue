<template>
  <Loader v-if="loading" />
  <input v-model="name" placeholder="Name" />  
  <input v-model="email" placeholder="Email" />
  <input v-model="password" type="password" placeholder="Password" />
  <input v-model="confirm_password" type="password" placeholder="Confirm Password" />

  <button @click="submit">Register</button>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import Loader from '@/components/common/Loader.vue'
import { warningToast } from '@/utils/toast'

const name = ref('')
const email = ref('')
const password = ref('')
const confirm_password = ref('')
const router = useRouter()
const { loading, register } = useAuth()

const submit = async () => {
    if (!name.value) {
        return warningToast('Name is required')
    }
    if (!email.value || !password.value) {
        return warningToast('Email and password are required')
    }
    if (password.value !== confirm_password.value) {
        return warningToast('Passwords do not match')
    }
    const success = await register({ name: name.value, email: email.value, password: password.value })
    if (success) router.push('/dashboard')
}
</script>