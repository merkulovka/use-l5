import {
    shallowRef,
    ref,
    useRoute,
    useRouter,
    watch,
    useRuntimeConfig
} from '#imports'
import type { Ref, ShallowRef } from 'vue'
import type {
    Filters,
    InferFromL5Schema,
    Options,
    SchemaDefinition
} from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'
import { buildQueryForApi } from '../utils/buildQueryForApi'
import { buildQueryForUrl } from '../utils/buildQueryForUrl'

export interface UseL5Return<S extends SchemaDefinition> {
    filters: Ref<Filters<S>>
    queryForApi: ShallowRef<Record<string, unknown>>
    updateFilters: (
        newFilters: Partial<Filters<S>>,
        _options?: Partial<Pick<Options<S>, 'urlUpdateStrategy'>>
    ) => void
    updateDefaults: (newDefaults: Partial<InferFromL5Schema<S>>) => void
    defaultsRef: Ref<Partial<InferFromL5Schema<S>>>
}

export function useL5<S extends SchemaDefinition>(
    scheme: S,
    options: Options<S> = {}
): UseL5Return<S> {
    const config = useRuntimeConfig()
    const moduleOptions = (config.public?.useL5 ?? {}) as Partial<Options<S>>

    const route = useRoute()
    const router = useRouter()

    const mergedOptions: Options<S> = { ...moduleOptions, ...options }

    const { syncWithRoute = false, urlUpdateStrategy = 'push' } = mergedOptions

    const defaultsRef = ref(mergedOptions.defaults ?? {}) as Ref<
        Partial<InferFromL5Schema<S>>
    >
    const query = syncWithRoute ? route.query : {}

    const filters = ref(
        parseFiltersFromQuery(scheme, query, {
            defaults: defaultsRef.value
        })
    ) as Ref<Filters<S>>

    const queryForApi = shallowRef(
        buildQueryForApi(filters.value, mergedOptions)
    )

    function updateFilters(
        newFilters: Partial<Filters<S>>,
        _options: Partial<Pick<Options<S>, 'urlUpdateStrategy'>> = {}
    ) {
        const {
            urlUpdateStrategy: localUrlUpdateStrategy = urlUpdateStrategy
        } = _options

        for (const key in newFilters) {
            (filters.value as Record<string, unknown>)[key] = newFilters[key]
        }

        if (!syncWithRoute) {
            queryForApi.value = buildQueryForApi(filters.value, mergedOptions)
            return
        }

        const query = buildQueryForUrl(filters.value, {
            ...mergedOptions,
            defaults: defaultsRef.value
        })

        const method
            = localUrlUpdateStrategy === 'replace' ? router.replace : router.push
        method.call(router, { query })
    }

    function updateDefaults(newDefaults: Partial<InferFromL5Schema<S>>) {
        defaultsRef.value = {
            ...defaultsRef.value,
            ...newDefaults
        }
    }

    function startWatchingForRoute() {
        watch(
            () => route.query,
            (newQuery) => {
                filters.value = parseFiltersFromQuery(scheme, newQuery, {
                    defaults: defaultsRef.value
                })

                queryForApi.value = buildQueryForApi(
                    filters.value,
                    mergedOptions
                )
            }
        )
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
