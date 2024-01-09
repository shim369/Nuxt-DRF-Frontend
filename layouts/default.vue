<template>
    <div class="bg-black-orign">
        <Header />
        <div class="min-h-screen text-white">
            <slot />
        </div>
        <footer class="flex justify-center p-5 text-[#d6d6d6]">
            &copy; 2023 My Portfolio
        </footer>
    </div>
</template>