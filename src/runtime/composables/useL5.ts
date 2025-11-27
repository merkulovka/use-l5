import { shallowReactive, useRoute } from '#imports'
import type { Options, SchemaDefinition } from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'
import { buildQueryForApi } from '../utils/buildQueryForApi'

export function useL5<S extends SchemaDefinition>(scheme: S, options: Options<S> = {}) {
    const route = useRoute()

    const {
        defaults = {}
    } = options
    const {
        syncWithRoute = false
    } = options
    const query = syncWithRoute ? route.query : {}
    const filters = shallowReactive(parseFiltersFromQuery(scheme, query, {
        defaults
    }))

    const queryForApi = shallowReactive(buildQueryForApi(filters, options))
    return {
        filters,
        queryForApi
    }
}
