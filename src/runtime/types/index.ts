export type Primitive = string | number | boolean | null | undefined

export type L5Node
    = | StringConstructor
        | NumberConstructor
        | BooleanConstructor
        | [L5Node]
        | { [k: string]: L5Node }

export type InferL5<T>
    = T extends StringConstructor ? string | null
        : T extends NumberConstructor ? number | null
            : T extends BooleanConstructor ? boolean
                : T extends [infer U] ? InferL5<U>[]
                    : T extends Record<string, unknown> ? { [K in keyof T]: InferL5<T[K]> }
                        : never

export type SchemaDefinition = Record<string, L5Node>

export type InferFromL5Schema<S extends SchemaDefinition> = {
    [K in keyof S]: InferL5<S[K]>;
}

export type Filters<S extends SchemaDefinition> = InferL5<S>

export interface Options<S extends SchemaDefinition> {
    defaults?: Partial<InferFromL5Schema<S>>
    syncWithRoute?: boolean
    resetPaginationWhenUpdate?: boolean
    excludeFromSearch?: (keyof S)[]
    apiIncludes?: string[]
    excludeFromQueryBuilder?: (keyof S)[]
    queryAliases?: Partial<Record<keyof S, string>>
    transformInput?: (query: Partial<S>) => Partial<S>
    transformOutput?: (filters: Filters<S>) => Record<keyof S & keyof BaseParams, unknown>
    urlUpdateStrategy?: 'replace' | 'push'
}

export interface BaseParams {
    page: number
    limit: number
    sortedBy: string
    orderBy: string
    searchJoin: string
    searchFields: string | null
    search: string | null
}
