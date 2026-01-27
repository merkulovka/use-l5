import {
    defineNuxtModule,
    addImportsDir,
    createResolver,
    addImports
} from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
    syncWithRoute?: boolean
    urlUpdateStrategy?: 'replace' | 'push'
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
        _nuxt.options.runtimeConfig.public ||= {}
        const existing = (_nuxt.options.runtimeConfig.public.useL5
            ?? {}) as Partial<ModuleOptions>
        _nuxt.options.runtimeConfig.public.useL5 = {
            ...existing,
            ..._options
        }

        const resolver = createResolver(import.meta.url)

        addImportsDir(resolver.resolve('./runtime/composables'))

        addImports({
            name: 'buildQueryForApi',
            as: 'buildQueryForApi',
            from: resolver.resolve('./runtime/utils/buildQueryForApi')
        })
        addImports({
            name: 'parseFiltersFromQuery',
            as: 'parseFiltersFromQuery',
            from: resolver.resolve('./runtime/utils/parseFiltersFromQuery')
        })
    }
})
