import type { Filters, Primitive, SchemaDefinition, Options, BaseParams } from '../types'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { parseValueFromQuery } from './parseValueFromQuery'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'

const BASE_PARAMS_KEYS = Object.keys(BASE_PARAMS_DEFAULTS)

export function buildQueryForApi<S extends SchemaDefinition>(_filters: Filters<S>, options: Options<S>) {
    const result: Record<string, unknown> = {}
    let filters: Record<string, unknown> = _filters
    const { excludeFromSearch = [], apiIncludes = [], excludeFromQueryBuilder = [], queryAliases, transformOutput } = options

    if (transformOutput) {
        filters = transformOutput(_filters)
    }
    BASE_PARAMS_KEYS.forEach((key) => {
        result[key] = filters[key]
    })

    excludeFromSearch.forEach((key) => {
        const alias = queryAliases?.[key] ?? key
        result[alias as string] = filters[key as string]
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
            const alias = queryAliases?.[key] ?? key
            return `${alias}:${Array.isArray(value) ? value.join(',') : value}`
        })
        .join(';')

    if (apiIncludes.length) {
        result.include = apiIncludes.join(',')
    }
    return result
}
