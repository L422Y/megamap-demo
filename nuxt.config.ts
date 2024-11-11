export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: {enabled: true},
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@pinia/nuxt"
  ],
  nitro: {
    preset: "cloudflare"
  },
  runtimeConfig: {
    public: {
      apiBase: "/api"
    }
  }
})