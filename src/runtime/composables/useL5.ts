import { shallowRef, toRef, useRoute, useRouter, watch } from '#imports'
import type { InferFromL5Schema, InferL5, Options, SchemaDefinition } from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'
import { buildQueryForApi } from '../utils/buildQueryForApi'
import { buildQueryForUrl } from '../utils/buildQueryForUrl'

export function useL5<S extends SchemaDefinition>(scheme: S, options: Options<S> = {}) {
    const route = useRoute()
    const router = useRouter()
    const {
        syncWithRoute = false,
        urlUpdateStrategy = 'push'
    } = options

    const defaultsRef = toRef(options.defaults ?? {})
    const query = syncWithRoute ? route.query : {}

    const filters = shallowRef(parseFiltersFromQuery(scheme, query, {
        defaults: defaultsRef.value
    }))

    const queryForApi = shallowRef(buildQueryForApi(filters.value, options))

    function updateFilters(newFilters: Partial<InferL5<S>>, _options: Partial<Pick<Options<S>, 'urlUpdateStrategy'>> = {}) {
        const { urlUpdateStrategy: localUrlUpdateStrategy = urlUpdateStrategy } = _options
        for (const key in newFilters) {
            filters.value[key] = newFilters[key]
        }

        if (!syncWithRoute) {
            queryForApi.value = buildQueryForApi(filters.value, { ...options, defaults: defaultsRef.value })
            return
        }

        const query = buildQueryForUrl(filters.value, { ...options, defaults: defaultsRef.value })

        const method = localUrlUpdateStrategy === 'replace'
            ? router.replace
            : router.push
        method.call(router, { query })
    }

    function updateDefaults(newDefaults: Partial<InferFromL5Schema<S>>) {
        defaultsRef.value = {
            ...defaultsRef.value,
            ...newDefaults
        }
    }

    function startWatchingForRoute() {
        watch(() => route.query, (newQuery) => {
            filters.value = parseFiltersFromQuery(scheme, newQuery, {
                defaults: defaultsRef.value
            })

            queryForApi.value = buildQueryForApi(filters.value, options)
        })
    }

    if (syncWithRoute) {
        startWatchingForRoute()
    }
    return {
        filters,
        queryForApi,
        updateFilters,
        updateDefaults,
        defaultsRef
    }
}
