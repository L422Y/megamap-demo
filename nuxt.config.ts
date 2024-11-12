export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/scripts"
  ],
  runtimeConfig: {
    public: {
      apiBase: "/api"
    }
  }
})