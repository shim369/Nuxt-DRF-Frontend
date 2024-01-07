<script setup lang="ts">
const config = useRuntimeConfig();
const apiUrl = config.public.API_BASE_URL;
const router = useRouter()
let email = ref('')
let password1 = ref('')
let password2 = ref('')
let errors = ref<string[]>([])

async function submitForm() {
    console.log('submitForm')

    errors.value = []

    await $fetch(`${apiUrl}/api/v1/users/`, {
        method: 'POST',
        body: {
            username: email.value,
            password: password1.value,
        }
    })
    .then(response => {
        console.log('response', response)

        router.push({path: '/login'})
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
    <UnderTitle under_h1="Sign up" />
    <div class="py-10 px-6">
        <div class="max-w-sm mx-auto py-10 px-6 bg-[#3a3a3a]">
            <form v-on:submit.prevent="submitForm">
                <input v-model="email" type="email" id="email" placeholder="Email" class="w-full mb-4 py-4 px-6 text-black">
                <input v-model="password1" type="password" id="password1" placeholder="Password" class="w-full mb-4 py-4 px-6 text-black">
                <input v-model="password2" type="password" id="password2" placeholder="Repeat Password" class="w-full mb-4 py-4 px-6 text-black">
                
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