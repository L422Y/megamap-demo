export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    preset: 'cloudflare'
  },
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  }
})
