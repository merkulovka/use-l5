import type { Filters, Options, SchemaDefinition } from '../types'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { isEqualArray } from './isEqualArray'

export function buildQueryForUrl<S extends SchemaDefinition>(filters: Filters<S>, options: Options<S>) {
    const defaults: Partial<Filters<S>> = {
        ...BASE_PARAMS_DEFAULTS,
        ...(options.defaults ?? {})
    }

    return Object.entries(filters)
        .filter(([key, value]) => {
            if (value === null || value === undefined) return false

            const defaultValue = defaults[key as keyof typeof defaults]

            if (Array.isArray(value) && Array.isArray(defaultValue)) {
                return !isEqualArray(value, defaultValue)
            }
            return value !== defaultValue
        })
        .reduce((acc, [k, v]) => {
            acc[k] = v as LocationQueryValue
            return acc
        }, {} as LocationQuery)
}
