<script setup lang="ts">
const isOpen = ref(false);

const toggleNav = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <header class="w-full bg-[#0f0f0f] flex items-center justify-between p-5 md:px-10 md:py-5">
        <NuxtLink to="/" class="lilita-one text-xl text-[#ff1e00] md:text-3xl">My Portfolio</NuxtLink>

        <nav class="pc-nav flex items-center space-x-4">
            <NavLinks />
        </nav>

        <div :class="['nav-icon', { 'active': isOpen }]" @click="toggleNav">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <nav :class="['sp-nav', { 'panelactive': isOpen }]">
            <NavLinks />
        </nav>

        <div :class="['circle', { 'circleactive': isOpen }]"></div>
    </header>
</template>