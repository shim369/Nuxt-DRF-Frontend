<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

onMounted(() => {
  userStore.initStore()
})
</script>
<template>
  <div class="bg-[#181818]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>