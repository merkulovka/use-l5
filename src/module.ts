import { defineNuxtModule, addImportsDir, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
    syncWithQuery: boolean
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name: 'use-l5',
        configKey: 'useL5',
        compatibility: {
            nuxt: '>=3.16'
        }
    },
    // Default configuration options of the Nuxt module
    defaults: {},
    setup(_options, _nuxt) {
        const resolver = createResolver(import.meta.url)

        addImportsDir(resolver.resolve('./runtime/composables'))
    }
})
