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
                return asArray(value).map(i => Number(i))
            }
            if (!value) return null
            return Number(value)
        case Boolean:
            if (!value) return null
            return ['1', 'true'].includes(value.toString())
        default:
            console.log(`Пропущен: ${node}`)
    }
}
