<script setup>
import { ref } from 'vue'

const isOpen = ref(false);

const toggleNav = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <header class="w-full bg-[#0f0f0f] p-6 flex items-center justify-between">
        <NuxtLink to="/" class="lilita-one text-xl text-[#E01A00] md:text-3xl">Portfolio</NuxtLink>

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