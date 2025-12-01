import type { L5Node, Primitive } from '../types'
import type { LocationQueryValue } from 'vue-router'

function asArray(value: LocationQueryValue | LocationQueryValue[] | undefined | Primitive | Primitive[]) {
    if (!value) return []
    if (Array.isArray(value)) return value
    return [value]
}

export function parseValueFromQuery(value: LocationQueryValue | LocationQueryValue[] | Primitive | Primitive[], node: L5Node): Primitive | Primitive[] {
    let isArray = false
    if (Array.isArray(node)) {
        node = node[0]
        isArray = true
    }
    switch (node) {
        case String:
            if (isArray) {
                return asArray(value).map(i => String(i))
            }
            if (!value) return null
            return String(value)
        case Number:
            if (isArray) {
                return asArray(value).map((i) => {
                    i = Number(i)
                    return Number.isNaN(i) ? null : i
                }).filter(i => i)
            }
            if (!value) return null
            value = Number(value)
            return Number.isNaN(value) ? null : value
        case Boolean:
            if (!value) return false
            return ['1', 'true'].includes(value.toString())
        default:
    }
}
