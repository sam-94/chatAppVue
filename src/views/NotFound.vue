<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page not found</p>
    <button @click="goHome">Go to Home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  background: #0f172a;
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.not-found h1 {
  font-size: 96px;
  margin: 0;
}

.not-found button {
  padding: 10px 18px;
  background: #3b82f6;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
}
</style>