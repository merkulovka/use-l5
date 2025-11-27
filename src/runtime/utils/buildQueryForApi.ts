import type { Filters, Primitive, SchemaDefinition, Options, BaseParams } from '../types'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { parseValueFromQuery } from './parseValueFromQuery'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'

const BASE_PARAMS_KEYS = Object.keys(BASE_PARAMS_DEFAULTS)

export function buildQueryForApi<S extends SchemaDefinition>(filters: Filters<S>, options: Options<S>) {
    const result: Record<string, unknown> = {}

    const { excludeFromSearch = [], apiIncludes = [], excludeFromQueryBuilder= [] } = options
    BASE_PARAMS_KEYS.forEach((key) => {
        result[key] = filters[key]
    })
    excludeFromSearch.forEach((key) => {
        result[key as string] = filters[key]
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
            return `${key}:${Array.isArray(value) ? value.join(',') : value}`
        })
        .join(';')

    if (apiIncludes.length) {
        result.include = apiIncludes.join(',')
    }
    return result
}
