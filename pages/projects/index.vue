<script setup lang="ts">
import type { Portfolio, Skill } from '@/types/portfolio';

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
let queryRef = ref('')
let query = ''

function performSearch() {
    queryRef.value = query
}

let { data: projectsSkills } = await useFetch<Skill[]>(`${apiUrl}/api/v1/projects/skills/`)
let selectedSkillsRef = ref('')
let selectedSkills = ref<number[]>([]);

function toggleSkill(id: number) {
    const index = selectedSkills.value.indexOf(id)

    if (index === -1) {
        selectedSkills.value.push(id)
    } else {
        selectedSkills.value.splice(index, 1)
    }

    selectedSkillsRef.value = selectedSkills.value.join(',')
}


let { data: projects } = await useFetch<Portfolio[]>(`${apiUrl}/api/v1/projects/`, {
    query: { query: queryRef, skills: selectedSkillsRef }
})
</script>

<template>
    <UnderTitle under_h1="Projects" />
    <div class="grid md:grid-cols-4 gap-6 py-10 px-6">
        <aside class="md:col-span-1 px-6 py-6">
            <div class="flex space-x-4 mb-10">
                <input v-model="query" type="search" name="search" placeholder="Find project"
                    class="w-full px-6 py-4 text-black outline-none">
                <button class="btn-red-search" v-on:click="performSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
            <h2 class="h3-title">Skills</h2>
            <div class="mt-6 space-y-4">
                <p v-for="skill in projectsSkills" v-bind:key="skill.id" v-on:click="toggleSkill(skill.id)"
                    class="group flex py-4 px-6 text-white cursor-pointer hover:bg-gray-400 hover:text-black"
                    v-bind:class="{ 'bg-gray-500': selectedSkills.includes(skill.id) }">
                    <span class="group-hover:ml-2 group-hover:mr-2 text-base mr-4 flex">&#9655;</span>{{ skill.title }}
                </p>
            </div>
        </aside>
        <main class="md:col-span-3">
            <ul class="space-y-4">
                <Project v-for="project in projects" v-bind:key="project.id" v-bind:project="project" :admin="true" />
            </ul>
        </main>
    </div>
</template>