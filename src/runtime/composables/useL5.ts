import { shallowReactive, shallowRef, useRoute, useRouter, watch } from '#imports'
import type { InferL5, Options, SchemaDefinition } from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'
import { buildQueryForApi } from '../utils/buildQueryForApi'
import { buildQueryForUrl } from '../utils/buildQueryForUrl'

export function useL5<S extends SchemaDefinition>(scheme: S, options: Options<S> = {}) {
    const route = useRoute()
    const router = useRouter()
    const {
        defaults = {},
        syncWithRoute = false,
        urlUpdateStrategy = 'push',
    } = options

    const query = syncWithRoute ? route.query : {}

    const filters = shallowRef(parseFiltersFromQuery(scheme, query, {
        defaults
    }))

    const queryForApi = shallowRef(buildQueryForApi(filters.value, options))

    function updateFilters(newFilters: Partial<InferL5<S>>, _options: Partial<Pick<Options<S>, 'urlUpdateStrategy'>> = {}) {
        const { urlUpdateStrategy: localUrlUpdateStrategy = urlUpdateStrategy } = _options
        for (const key in newFilters) {
            filters.value[key] = newFilters[key]
        }

        if (!syncWithRoute) {
            queryForApi.value = buildQueryForApi(filters.value, options)
            return
        }

        const query = buildQueryForUrl(filters.value, options)

        const method = localUrlUpdateStrategy === 'replace'
            ? router.replace
            : router.push
        method.call(router, { query })
    }

    function startWatchingForRoute() {
        watch(() => route.query, (newQuery) => {
            filters.value = parseFiltersFromQuery(scheme, newQuery, {
                defaults
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
        updateFilters
    }
}
