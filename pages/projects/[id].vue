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
        if (project.value) {
            useSeoMeta({
                title: project.value.title + ' | My Portfolio',
                description: project.value.description
            });
        }
    } catch (error) {
        console.error('Error fetching project:', error);
    }
});
</script>

<template>
    <UnderTitle under_h1="Project Detail" />
    <div class="py-10 px-6">
        <div v-if="project"
            class="py-5 px-5 m-auto bg-[#3a3a3a] border-b-8 border-[#e82c2c] md:py-10 md:px-10 md:w-full">
            <h2 class="h2-title">{{ project.title }}</h2>
            <div class="flex flex-col items-start mt-10 md:flex-row">
                <NuxtImg format="webp" :src="`${apiUrl}${project.big_image}`" class="w-full md:w-1/4 h-auto object-cover"
                    :alt="project.title" width="800" height="400" />
                <div class="w-full mx-auto ml-0 md:w-3/4 md:ml-20">
                    <div class="text-base mt-10 md:mt-0">{{ project.content }}</div>
                    <div class="mt-10">
                        <a :href="project.demo_link" target="_blank" rel="noopener noreferrer"
                            class="btn-gray-rounded mr-2">URL</a>
                        <a :href="project.github_repo" target="_blank" rel="noopener noreferrer"
                            class="btn-gray-rounded">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center h-screen">
            Loading...
        </div>
    </div>
</template>