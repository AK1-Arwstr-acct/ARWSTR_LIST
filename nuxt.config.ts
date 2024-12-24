// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  components: [{ path: "~/components", pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_APP_API_BASE_URL,
    },
  },
})