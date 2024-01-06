<script setup lang="ts">
import { useUserStore } from '@/store/user';
const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
const router = useRouter()
const userStore = useUserStore()

let email = ref('')
let password = ref('')
let errors = ref<string[]>([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []

    await $fetch<{ auth_token: string }>(`${apiUrl}/api/v1/token/login/`, {
        method: 'POST',
        body: {
            username: email.value,
            password: password.value,
        }
    })
    .then(data => {
        console.log('response', data.auth_token)

        userStore.setToken(data.auth_token, email.value)

        router.push({path: '/'})
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
</script>
<template>
    <UnderTitle under_h1="Log in" />
    <div class="py-10 px-6">
        <div class="max-w-sm mx-auto py-10 px-6 bg-[#3a3a3a]">
            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" id="email" placeholder="Email" class="w-full mb-4 py-4 px-6 text-black">
                <input v-model="password" type="password" id="password" placeholder="Password" class="w-full mb-4 py-4 px-6 text-black">
                
                <div
                    v-if="errors.length"
                    class="mb-6 py-4 px-6 bg-[#f84934] text-white"
                >
                    <p v-for="error in errors" v-bind:key="error">
                        {{ error }}
                    </p>
                </div>
                
                <button class="py-4 px-6 text-white bg-[#E01A00]">Submit</button>
            </form>
        </div>
    </div>
</template>