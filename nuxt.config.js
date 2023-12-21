// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [ '@nuxt/ui' , '@nuxtjs/tailwindcss' , '@samk-dev/nuxt-vcalendar' ],
  nextui: {
    theme: {
      // Define tu tema aquí
      colors: {
        // Colores para el modo claro
        light: {
          primary: '#00FF00',
          // ...otros colores
        },
        // Colores para el modo oscuro
        dark: {
          primary: '#0000FF',
          // ...otros colores
        }
      }
    },
    // Opciones adicionales de NextUI
    // ...
  },
  vite: {
   server: {
        host: "localhost",
        port: 3000,
        proxy: {
          "/api": {
            target: "http://127.0.0.1:8000/api",
            changeOrigin: true,
            athRewrite: { '^/api': '' },
          },
        },
        hmr: { overlay: false },
      },
  },
})

