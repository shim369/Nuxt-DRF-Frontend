<script setup lang="ts">
import axios from 'axios';
import type { Portfolio, Skill } from '@/types/portfolio';

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
let queryRef = ref('')
let query = ''

function performSearch() {
    queryRef.value = query
}

let projectsSkills = ref<Skill[]>([]);
let selectedSkillsRef = ref('')
let selectedSkills = ref<number[]>([]);

const fetchProjectsSkills = async () => {
    try {
        const response = await axios.get<Skill[]>(`${apiUrl}/api/v1/projects/skills/`)
        projectsSkills.value = response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
};

function toggleSkill(id: number) {
    const index = selectedSkills.value.indexOf(id)

    if (index === -1) {
        selectedSkills.value.push(id)
    } else {
        selectedSkills.value.splice(index, 1)
    }

    selectedSkillsRef.value = selectedSkills.value.join(',')
}

let projects = ref<Portfolio[]>([]);

watchEffect(async () => {
    try {
        const response = await axios.get<Portfolio[]>(`${apiUrl}/api/v1/projects/`, {
            params: { query: queryRef.value, skills: selectedSkillsRef.value }
        });
        projects.value = response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
});

onMounted(fetchProjectsSkills);

useSeoMeta({
    title: 'Projects | My Portfolio',
    description: 'Projects page'
})
</script>

<template>
    <UnderTitle under_h1="Projects" />
    <div class="grid md:grid-cols-4 gap-5 px-5 py-10 md:p-10">
        <aside class="md:col-span-1 p-5">
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
            <h3 class="h3-title">Skills</h3>
            <div class="mt-6 space-y-4">
                <p v-for="skill in projectsSkills" v-bind:key="skill.id" v-on:click="toggleSkill(skill.id)"
                    class="group flex items-center py-4 px-6 text-white cursor-pointer transition-all duration-400 hover:bg-gray-400 hover:text-black"
                    v-bind:class="{ 'bg-gray-500': selectedSkills.includes(skill.id) }">
                    <span class="group-hover:ml-1 group-hover:mr-1 text-sm mr-2 flex transition-all duration-400">&#9655;</span>{{ skill.title }}
                </p>
            </div>
        </aside>
        <main class="md:col-span-3">
            <ul class="space-y-4">
                <Project v-for="project in projects" v-bind:key="project.id" v-bind:project="project" />
            </ul>
        </main>
    </div>
</template>