<script setup lang="ts">
import type { Portfolio } from '@/types/portfolio';
const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;

const props = defineProps<{
    project: Portfolio
}>();
</script>

<template>
    <li v-if="props.project" class="p-5 bg-[#3a3a3a] md:p-10" :key="props.project.id">
        <h2 class="h2-title">{{ props.project.title }}</h2>
        <div class="flex flex-col items-start w-full md:flex-row">
            <NuxtImg format="webp" :src="`${apiUrl}${props.project.small_image}`" :alt="props.project.title"
                class="w-full md:w-1/4 h-auto max-h-[300px] object-contain mt-10 md:mt-0" width="300" height="300"
                sizes="(max-width: 768px) 100vw, 300px" />
            <div class="w-full md:w-3/4 ml-0 mt-10 md:ml-5 md:mt-0">
                <p class="mt-5 mb-5 ml-[2px] md:mt-0">{{ props.project.description }}</p>
                <table class="w-full border-separate mb-3">
                    <tbody>
                        <tr>
                            <th class="bg-[#2b2a2a] p-5 w-[20%]">TECH</th>
                            <td class="bg-[#2b2a2a] p-5 break-all">
                                <ul class="flex">
                                    <li key="tech" class="mr-2">{{ props.project.skill_title }}
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th class="bg-[#2b2a2a] p-5">URL</th>
                            <td class="bg-[#2b2a2a] p-5 break-all">
                                <a :href="props.project.demo_link" target="_blank" rel="noopener noreferrer"
                                    class="underline hover:no-underline">
                                    {{ props.project.demo_link }}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <th class="bg-[#2b2a2a] p-5">GitHub</th>
                            <td class="bg-[#2b2a2a] p-5 break-all">
                                <a :href="props.project.github_repo" target="_blank" rel="noopener noreferrer"
                                    class="underline hover:no-underline">
                                    {{ props.project.github_repo }}
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="space-x-4 flex justify-end">
                    <NuxtLink v-bind:to="'/projects/' + props.project.id" class="btn-red-rounded">Detail</NuxtLink>
                </div>
            </div>
        </div>
    </li>
    <li v-else class="flex justify-center" aria-label="読み込み中">
        <div class="animate-spin h-10 w-10 border-4 border-[#E01A00] rounded-full border-t-transparent"></div>
    </li>
</template>