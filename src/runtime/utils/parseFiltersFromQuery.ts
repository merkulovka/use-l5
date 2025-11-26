import type { Filters, Primitive, SchemaDefinition, Options } from '../types'
import type { LocationQuery, LocationQueryValue } from 'vue-router'
import { parseValueFromQuery } from './parseValueFromQuery'

export function parseFiltersFromQuery<S extends SchemaDefinition>(scheme: S, query: LocationQuery, options: Required<Pick<Options<S>, 'defaults'>>) {
    const result: Record<string, Primitive | Primitive[]> = {}
    Object.keys(scheme).forEach((key) => {
        if (!scheme[key]) return

        let value: LocationQueryValue | LocationQueryValue[] | Primitive | Primitive[] = query[key]
        value ??= options.defaults[key] as Primitive | Primitive[]
        result[key] = parseValueFromQuery(value, scheme[key])
    })
    return result as Filters<S>
}
