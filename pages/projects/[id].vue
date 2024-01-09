<script setup lang="ts">
import axios from 'axios';
import type { Portfolio } from '@/types/portfolio';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
const route = useRoute();

const project = ref<Portfolio | null>(null);

onMounted(async () => {
    try {
        const response = await axios.get<Portfolio>(`${apiUrl}/api/v1/projects/${route.params.id}/`);
        project.value = response.data;
        useSeoMeta({
            title: project.value.title + ' | My Portfolio',
            description: project.value.description
        });
    } catch (error) {
        console.error('Error fetching project:', error);
    }
});
</script>

<template>
    <UnderTitle under_h1="Project Detail" />
    <div class="py-10 px-6 w-[90%] md:w-[60%] m-auto bg-[#3a3a3a] mt-10 border-b-8 border-[#e82c2c]" v-if="project">
        <div class="m-auto md:col-span-3">
            <h2 class="mb-6 text-2xl">{{ project.title }}</h2>
            <img :src="`${apiUrl}${project.big_image}`" class="max-h-[400px] w-full object-cover" :alt="project.title">
            <div class="mt-6 text-base">{{ project.content }}</div>
            <div class="mt-10">
                <a :href="project.demo_link" target="_blank" rel="noopener noreferrer"
                    class="btn-gray-rounded mr-2">URL</a>
                <a :href="project.github_repo" target="_blank" rel="noopener noreferrer"
                    class="btn-gray-rounded">GitHub</a>
            </div>
        </div>
    </div>
    <div v-else class="flex justify-center items-center h-screen">
        Loading...
    </div>
</template>