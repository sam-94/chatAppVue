<template>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleOffline = () => {
  router.push('/offline')
}

const handleOnline = () => {
  if (router.currentRoute.value.name === 'Offline') {
    router.back()
  }
}

onMounted(() => {
  if (!navigator.onLine) handleOffline()

  window.addEventListener('offline', handleOffline)
  window.addEventListener('online', handleOnline)
})

onUnmounted(() => {
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('online', handleOnline)
})
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f5f6fa;
  color: #222;
}
</style>