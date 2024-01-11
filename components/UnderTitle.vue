<script setup lang="ts">
const props = defineProps({
    under_h1: String
});
</script>

<template>
    <div class="py-20 px-5 bg-[#1a1a1a] text-center">
        <h1 class="h1-title text-3xl md:text-4xl">{{ props.under_h1 }}</h1>
    </div>
</template>