import type { Filters, SchemaDefinition, Options } from '../types'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'

const BASE_PARAMS_KEYS = Object.keys(BASE_PARAMS_DEFAULTS)

export function buildQueryForApi<S extends SchemaDefinition>(
    _filters: Filters<S>,
    options: Options<S>
) {
    const {
        excludeFromSearch = [],
        apiIncludes = [],
        excludeFromQueryBuilder = [],
        queryAliases,
        transformOutput
    } = options
    const filters: Record<string, unknown> = transformOutput
        ? transformOutput(_filters)
        : { ..._filters }
    const result: Record<string, unknown> = {}
    const rootKeys = [...BASE_PARAMS_KEYS, ...excludeFromSearch]

    function getAlias(key: string) {
        return queryAliases?.[key] ?? key
    }

    if (options.boolToNumber) {
        Object.entries(filters).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                filters[key] = Number(value)
            }
        })
    }

    rootKeys.forEach((key) => {
        result[getAlias(key)] = filters[key]
    })

    result.search = Object.entries(filters)
        .filter(([key, value]) => {
            if (BASE_PARAMS_KEYS.includes(key)) return false
            if (excludeFromSearch.includes(key)) return false
            if (excludeFromQueryBuilder.includes(key)) return false
            if (Array.isArray(value)) {
                return value.length > 0
            }
            return value !== null
        })
        .map(([key, value]) => {
            return `${getAlias(key)}:${Array.isArray(value) ? value.join(',') : value}`
        })
        .join(';')

    if (apiIncludes.length) {
        result.include = apiIncludes.join(',')
    }
    return result
}
