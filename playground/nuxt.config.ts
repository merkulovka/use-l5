import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    modules: ['../src/module'],
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    useL5: {}
})
