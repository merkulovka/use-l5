import {
    shallowRef,
    ref,
    toRef,
    useRoute,
    useRouter,
    watch,
    useRuntimeConfig
} from '#imports'
import type {
    InferFromL5Schema,
    InferL5,
    Options,
    SchemaDefinition
} from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'
import { buildQueryForApi } from '../utils/buildQueryForApi'
import { buildQueryForUrl } from '../utils/buildQueryForUrl'

export function useL5<S extends SchemaDefinition>(
    scheme: S,
    options: Options<S> = {}
) {
    const config = useRuntimeConfig()
    const moduleOptions = (config.public?.useL5 ?? {}) as Partial<Options<S>>

    const route = useRoute()
    const router = useRouter()

    const mergedOptions: Options<S> = { ...moduleOptions, ...options }

    const { syncWithRoute = false, urlUpdateStrategy = 'push' } = mergedOptions

    const defaultsRef = toRef(options.defaults ?? {})
    const query = syncWithRoute ? route.query : {}

    const filters = ref(
        parseFiltersFromQuery(scheme, query, {
            defaults: defaultsRef.value
        })
    )

    const queryForApi = shallowRef(buildQueryForApi(filters.value, options))

    function updateFilters(
        newFilters: Partial<InferL5<S>>,
        _options: Partial<Pick<Options<S>, 'urlUpdateStrategy'>> = {}
    ) {
        const {
            urlUpdateStrategy: localUrlUpdateStrategy = urlUpdateStrategy
        } = _options

        if (options.resetPaginationWhenUpdate) {
            filters.value.page = 1
        }

        for (const key in newFilters) {
            filters.value[key] = newFilters[key]
        }

        if (!syncWithRoute) {
            queryForApi.value = buildQueryForApi(filters.value, {
                ...options,
                defaults: defaultsRef.value
            })
            return
        }

        const query = buildQueryForUrl(filters.value, {
            ...options,
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

                queryForApi.value = buildQueryForApi(filters.value, options)
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
