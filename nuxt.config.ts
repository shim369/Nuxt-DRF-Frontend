// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Lato: [300],
      'Lilita+One': true,
    }
  },
  modules: [
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],
  image: {
    format: ['webp']
  }
})
