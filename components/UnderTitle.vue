<script>
export default {
	props: {
		under_h1: String
	}
}
</script>

<template>
    <div class="py-20 px-6 bg-[#1a1a1a] text-center">
        <h1 class="h1-title text-3xl md:text-4xl">{{ under_h1 }}</h1>
    </div>
</template>