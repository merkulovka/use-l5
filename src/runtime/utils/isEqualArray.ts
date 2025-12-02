import { isEqual } from 'es-toolkit/predicate'

export function isEqualArray(first: unknown[], second: unknown[]) {
    if (first === second) return true

    if (first.length !== second.length) return false

    const normalizedFirst = [...first].sort()
    const normalizedSecond = [...second].sort()

    return isEqual(normalizedFirst, normalizedSecond)
}
