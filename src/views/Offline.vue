<template>
  <div class="offline">
    <h1>📡 No Internet</h1>
    <p>Please check your internet connection</p>
    <small>We’ll reconnect automatically</small>
  </div>
</template>

<script setup></script>

<style scoped>
.offline {
  min-height: 100vh;
  background: #020617;
  color: #e5e7eb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.offline h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

.offline p {
  font-size: 18px;
  margin-bottom: 6px;
}

.offline small {
  color: #94a3b8;
}
</style>