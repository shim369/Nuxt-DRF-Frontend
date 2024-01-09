<script setup lang="ts">
import type { Portfolio } from '@/types/portfolio';
import { defineProps } from 'vue';
const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;

const props = defineProps<{
    project: Portfolio
}>();
</script>

<template>
    <li class="flex flex-col items-start w-full p-5 bg-[#3a3a3a] md:flex-row" :key="props.project.id">
        <img :src="`${apiUrl}${props.project.small_image}`" :alt="props.project.title" class="w-full md:w-1/4 h-auto max-h-[300px] object-contain" width="300" />
        <div class="w-full md:w-3/4 ml-0 mt-5 md:ml-5 md:mt-0">
            <h2 class="h2-title">{{ props.project.title }}</h2>
            <p class="mt-4 mb-6">{{ props.project.description }}</p>
            <table class="w-full border-separate mb-3">
                <tbody>
                    <tr>
                        <th class="bg-[#2b2a2a] p-4 w-[20%]">TECH</th>
                        <td class="bg-[#2b2a2a] p-4 break-all">
                            <ul class="flex">
                                <li key="tech" class="mr-2">{{ props.project.skill_title }}
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-[#2b2a2a] p-4">URL</th>
                        <td class="bg-[#2b2a2a] p-4 break-all">
                            <a :href="props.project.demo_link" target="_blank" rel="noopener noreferrer"
                                class="underline hover:no-underline">
                                {{ props.project.demo_link }}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-[#2b2a2a] p-4">GitHub</th>
                        <td class="bg-[#2b2a2a] p-4 break-all">
                            <a :href="props.project.github_repo" target="_blank" rel="noopener noreferrer"
                                class="underline hover:no-underline">
                                {{ props.project.github_repo }}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="space-x-4 flex justify-end">
                <nuxt-link v-bind:to="'/projects/' + props.project.id" class="btn-red-rounded">Detail</nuxt-link>
            </div>
        </div>
    </li>
</template>