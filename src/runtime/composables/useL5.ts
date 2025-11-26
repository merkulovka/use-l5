import { shallowReactive, useRoute } from '#imports'
import type { Options, SchemaDefinition } from '../types'
import { parseFiltersFromQuery } from '../utils/parseFiltersFromQuery'

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
    return {
        filters
    }
}
