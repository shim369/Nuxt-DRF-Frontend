<template>
    <div class="bg-black-orign">
        <Header />
        <div class="max-w-[1440px] mx-auto min-h-screen text-white">
            <slot />
        </div>
        <footer class="flex justify-center p-5 text-white">
            &copy; 2023 My Portfolio
        </footer>
    </div>
</template>