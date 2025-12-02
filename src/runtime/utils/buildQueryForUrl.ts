import type {Filters, InferFromL5Schema, Options, SchemaDefinition} from '../types'
import { BASE_PARAMS_DEFAULTS } from '../constant/baseParams.const'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { toMerged } from 'es-toolkit/object'
import { isEqualArray } from './isEqualArray'

export function buildQueryForUrl<S extends SchemaDefinition>(filters: Filters<S>, options: Options<S>) {
    const defaults = toMerged(BASE_PARAMS_DEFAULTS, options.defaults ?? {}) as Partial<InferFromL5Schema<S>>

    return Object.entries(filters)
        .filter(([key, value]) => {
            if (!value) return false

            if (Array.isArray(value) && Array.isArray(defaults?.[key])) {
                return !isEqualArray(value, defaults[key] as unknown[])
            }
            return value !== defaults?.[key]
        })
        .reduce((acc, [k, v]) => {
            acc[k] = v as LocationQueryValue
            return acc
        }, {} as LocationQuery)
}
