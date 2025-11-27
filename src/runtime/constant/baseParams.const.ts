import type { BaseParams, L5Node } from '../types'

export const BASE_PARAMS_DEFAULTS: BaseParams = {
    page: 1,
    limit: 10,
    sortedBy: 'id',
    orderBy: 'desc',
    searchJoin: 'and',
    searchFields: '',
    search: ''
}

export const BASE_PARAMS_DEFAULTS_TYPE_MAP: Record<keyof BaseParams, L5Node> = {
    page: Number,
    limit: Number,
    sortedBy: String,
    orderBy: String,
    searchJoin: String,
    searchFields: String,
    search: String
}
