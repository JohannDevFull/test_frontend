<script setup lang="ts">
const router = useRouter()

const nav = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
]
</script>

<template>
  <NuxtLayout name="applayout">
    <NuxtPage />
  </NuxtLayout>
</template>