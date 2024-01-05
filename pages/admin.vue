<script setup>
import { onMounted, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'

const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;

const userStore = useUserStore()
const router = useRouter()
let projects = ref()

onMounted(() => {
  checkAuthentication()
})

watchEffect(() => {
  checkAuthentication()
})

function checkAuthentication() {
  if (!userStore.user.isAuthenticated) {
    router.push('/login')
  } else {
        getProjects()
    }
}

async function getProjects() {
    await $fetch(`${apiUrl}/api/v1/projects/admin`, {
        headers: {
            'Authorization': 'token ' + userStore.user.token,
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            projects.value = response
        })
        .catch(error => {
            console.log('error', error)
        })
}

function deleteProject(id) {
    // console.log('id', id)

    projects.value = projects.value.filter(project => project.id !== id)
}
</script>

<template>
    <UnderTitle under_h1="Admin" />
    <div class="py-10 px-6">
        <ul class="space-y-4">
            <Project v-for="project in projects" :key="project.id" :project="project" :admin="true"
                @deleteProject="deleteProject" />
        </ul>
    </div>
</template>