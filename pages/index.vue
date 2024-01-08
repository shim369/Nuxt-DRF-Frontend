<script setup lang="ts">
import type { Portfolio } from '@/types/portfolio';

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;

const { data: projects } = await useFetch<Portfolio[]>(`${apiUrl}/api/v1/projects/newest/`)
// console.log(projects.value)

useSeoMeta({
    title: 'My Portfolio',
    description: 'My Portfolio'
})
</script>
<template>
    <div class="py-40 px-6 bg-[#1a1a1a] text-center">
        <h1 class="h1-title mb-2 text-4xl md:text-7xl">WEB DEVELOPMENT</h1>
        <p class="lilita-one text-xl text-[#6b6b6b]">My Portfolio</p>
    </div>
    <div class="grid md:grid-cols-4 gap-6 py-10 px-6 text-white">
        <main class="md:col-span-3">
            <ul class="space-y-4">
                <Project v-for="project in projects" :key="project.id" :project="project" :admin="false" />
            </ul>
        </main>
        <aside class="md:col-span-1">
            <div class="p-5 bg-[#3a3a3a]">
                <h2 class="h2-title">Profile</h2>
                <div class="mb-2">
                    <div class="py-8">
                        <img src="/pongki2.jpg" alt=""
                            class="rounded-full max-w-[150px] w-[100%] max-h-[150px] h-[100%] m-auto mb-6" />
                    </div>
                    <p class="text-center mb-2">S-Ohtani</p>
                    <p class="text-center">Passionate developer</p>
                </div>
            </div>
        </aside>
    </div>
</template>