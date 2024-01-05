<script setup>
import { onMounted, watchEffect } from 'vue'
import { useUserStore } from '@/store/user'
const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
    checkAuthentication()
})

watchEffect(() => {
    checkAuthentication()
})

function checkAuthentication() {
    if (!userStore.user.isAuthenticated) {
        router.push('/login')
    }
}

const { data: project } = await useFetch(`${apiUrl}/api/v1/projects/` + route.params.id + '/')

let title = ref(project.value.title)
let description = ref(project.value.description)
let image_url = ref(project.value.image_url)
let demo_link = ref(project.value.demo_link)
let github_repo = ref(project.value.github_repo)
let content = ref(project.value.content)
let errors = ref([])


async function submitForm() {
    console.log('submitForm')

    errors.value = []

    if (image_url.value == '') { errors.value.push('The image url field is missing') }
    if (title.value == '') { errors.value.push('The title field is missing') }
    if (description.value == '') { errors.value.push('The description field is missing') }
    if (demo_link.value == '') { errors.value.push('The link field is missing') }
    if (github_repo.value == '') { errors.value.push('The github field is missing') }
    if (content.value == '') { errors.value.push('The content field is missing') }

    if (errors.value.length == 0) {
        await $fetch(`${apiUrl}/api/v1/projects/` + route.params.id + '/edit/', {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + userStore.user.token,
                'Content-Type': 'application/json'
            },
            body: {
                title: title.value,
                description: description.value,
                image_url: image_url.value,
                demo_link: demo_link.value,
                github_repo: github_repo.value,
                content: content.value,
            }
        })
            .then(response => {
                console.log('response', response)

                router.push({ path: '/admin' })
            })
            .catch(error => {
                if (error.response) {
                    for (const property in error.response._data) {
                        errors.value.push(`${property}: ${error.response._data[property]}`)
                    }
                    console.log(JSON.stringify(error.response))
                } else if (error.message) {
                    errors.value.push('Something went wrong. Please try again')

                    console.log(JSON.stringify(error))
                }
            })
    }
}
</script>

<template>
    <UnderTitle under_h1="Edit Project" />
    <div class="py-10 px-6">
        <form v-on:submit.prevent="submitForm" class="space-y-4 m-auto w-full md:w-3/5">

            <div>
                <label for="image_url">Image URL</label>
                <input v-model="image_url" id="image_url" type="text" class="w-full mt-2 p-4 text-black">
            </div>

            <div>
                <label for="title">Title</label>
                <input v-model="title" id="title" type="text" class="w-full mt-2 p-4 text-black">
            </div>

            <div>
                <label for="description">Description</label>
                <textarea v-model="description" id="description" type="text" class="w-full mt-2 p-4 text-black"></textarea>
            </div>

            <div>
                <label for="demo_link">URL</label>
                <input v-model="demo_link" id="demo_link" type="text" class="w-full mt-2 p-4 text-black">
            </div>

            <div>
                <label for="github_repo">GitHub</label>
                <input v-model="github_repo" id="github_repo" type="text" class="w-full mt-2 p-4 text-black">
            </div>

            <div>
                <label for="Content">Content</label>
                <textarea v-model="content" id="Content" type="text" class="w-full mt-2 p-4 text-black"></textarea>
            </div>

            <div v-if="errors.length" class="mb-6 py-4 px-6 bg-[#f84934] text-white">
                <p v-for="error in errors" v-bind:key="error">
                    {{ error }}
                </p>
            </div>

            <button class="py-4 px-6 text-white bg-[#E01A00]">Save changes</button>
        </form>
    </div>
</template>