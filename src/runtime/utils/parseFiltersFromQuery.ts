import type { Filters, Primitive, SchemaDefinition, Options, BaseParams } from '../types'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { parseValueFromQuery } from './parseValueFromQuery'
import { BASE_PARAMS_DEFAULTS, BASE_PARAMS_DEFAULTS_TYPE_MAP } from '../constant/baseParams.const'

export function parseFiltersFromQuery<S extends SchemaDefinition>(scheme: S, query: LocationQuery, options: Required<Pick<Options<S>, 'defaults'>>) {
    const result: Record<string, Primitive | Primitive[]> = {}

    Object.keys(scheme).forEach((key) => {
        if (!scheme[key]) return

        let value: LocationQueryValue | LocationQueryValue[] | Primitive | Primitive[] = query[key]
        value ??= options.defaults[key] as Primitive | Primitive[]
        result[key] = parseValueFromQuery(value, scheme[key])
    })

    for (const key in BASE_PARAMS_DEFAULTS_TYPE_MAP) {
        const typedKey = key as keyof BaseParams

        let value: LocationQueryValue | LocationQueryValue[] | Primitive | Primitive[] = query[typedKey]
        value ??= options.defaults[key] as Primitive | Primitive[]
        value ??= BASE_PARAMS_DEFAULTS[typedKey]
        result[key] = parseValueFromQuery(value, BASE_PARAMS_DEFAULTS_TYPE_MAP[typedKey])
    }
    return result as Filters<S>
}
