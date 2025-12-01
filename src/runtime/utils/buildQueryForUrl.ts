import type { Filters, Options, SchemaDefinition } from '../types'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { isEqualArray } from './isEqualArray'

export function buildQueryForUrl<S extends SchemaDefinition>(filters: Filters<S>, options: Options<S>) {
    const defaults = Object.assign(BASE_PARAMS_DEFAULTS, options.defaults)

    return Object.entries(filters)
        .filter(([key, value]) => {
            if (!value) return false

            if (Array.isArray(value) && Array.isArray(defaults?.[key])) {
                return isEqualArray(value, defaults?.[key])
            }
            return value !== defaults?.[key]
        })
        .reduce((acc, [k, v]) => {
            acc[k] = v as LocationQueryValue
            return acc
        }, {} as LocationQuery)
}
