export function isEqualArray(first: unknown[], second: unknown[]) {
    if (first === second) return true

    if (first.length !== second.length) return false
    return JSON.stringify(first.sort()) === JSON.stringify(second.sort())
}
