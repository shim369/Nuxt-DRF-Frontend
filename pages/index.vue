<script setup lang="ts">
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Portfolio } from '@/types/portfolio';
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
const projects = ref<Portfolio[]>([]);

const fetchProjects = async () => {
    try {
        const response: AxiosResponse<Portfolio[]> = await axios.get(`${apiUrl}/api/v1/projects/newest/`);
        projects.value = response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
};

onMounted(fetchProjects);

useSeoMeta({
    title: 'My Portfolio',
    description: 'My Portfolio'
});
</script>

<template>
    <div class="py-40 px-6 bg-[#1a1a1a] text-center">
        <h1 class="h1-title mb-2 text-4xl md:text-7xl">WEB DEVELOPMENT</h1>
        <p class="lilita-one text-xl text-[#bdbdbd]">My Portfolio</p>
    </div>
    <div class="grid md:grid-cols-4 gap-10 p-5 md:p-10 text-white">
        <main class="md:col-span-3">
            <ul class="space-y-4">
                <Project v-for="project in projects" :key="project.id" :project="project" />
            </ul>
        </main>
        <aside class="md:col-span-1">
            <div class="p-5 bg-[#3a3a3a] md:p-10">
                <h2 class="h2-title">Profile</h2>
                <div class="mb-2">
                    <div class="py-8">
                        <NuxtImg format="webp" src="/pongki.webp" alt="pongki"
                            class="rounded-full max-w-[150px] w-[100%] max-h-[150px] h-[100%] m-auto mb-6" width="150"
                            height="150" />
                    </div>
                    <p class="text-center mb-2">S-Ohtani</p>
                    <p class="text-center">Passionate developer</p>
                </div>
            </div>
        </aside>
    </div>
</template>