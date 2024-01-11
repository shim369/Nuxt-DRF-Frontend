<script setup lang="ts">
import axios from 'axios';
import type { Portfolio } from '@/types/portfolio';
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
    <div class=" px-5 py-10 md:p-10">
        <div v-if="project" class="p-5 m-auto bg-[#3a3a3a] border-b-8 border-[#e82c2c] md:p-10 md:w-full">
            <h2 class="h2-title">{{ project.title }}</h2>
            <div class="flex flex-col items-start md:flex-row">
                <NuxtImg format="webp" :src="`${apiUrl}${project.big_image}`" class="w-full md:w-1/4 h-auto object-cover"
                    :alt="project.title" width="800" height="400" />
                <div class="w-full mx-auto ml-0 md:w-3/4 md:ml-10">
                    <div class="p-5 bg-[#2b2a2a] text-base mt-5 break-all md:mt-0 md:p-10">
                        
                        <h3 class="h3-title">Frontend</h3>
                        <p class="mb-10">{{ project.frontend }}</p>
                        <h3 class="h3-title">Backend</h3>
                        <p class="mb-10">{{ project.backend }}</p>
                        <h3 class="h3-title">Detail</h3>
                        <div v-html="project.content"></div>
                    </div>
                    <div class="mt-5 space-x-4 flex justify-end">
                        <a :href="project.demo_link" target="_blank" rel="noopener noreferrer"
                            class="btn-red-rounded">URL</a>
                        <a :href="project.github_repo" target="_blank" rel="noopener noreferrer"
                            class="btn-red-rounded">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center" aria-label="読み込み中">
            <div class="animate-spin h-10 w-10 border-4 border-[#E01A00] rounded-full border-t-transparent"></div>
        </div>
    </div>
</template>