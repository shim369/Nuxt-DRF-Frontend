<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

function logout() {
    userStore.removeToken()
}
</script>

<template>
    <NuxtLink to="/" class="text-white">Home</NuxtLink>
    <NuxtLink to="/projects" class="text-white">Projects</NuxtLink>

    <template v-if="userStore.user.isAuthenticated">
        <NuxtLink to="/admin" class="btn-red-rounded">
            Admin</NuxtLink>
        <NuxtLink to="/post" class="btn-red-rounded">
            Post</NuxtLink>
        <a v-on:click="logout" class="btn-red-rounded">
            Log out</a>
    </template>

    <template v-else>
        <NuxtLink to="/login" class="btn-red-rounded">
            Log in</NuxtLink>
        <NuxtLink to="/signup" class="btn-red-rounded">
            Sign up</NuxtLink>
    </template>
</template>