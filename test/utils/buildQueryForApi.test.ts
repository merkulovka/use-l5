import { describe, expect, it } from 'vitest'
import { buildQueryForApi } from '../../src/runtime/utils/buildQueryForApi'
import { BASE_PARAMS_DEFAULTS } from '../../src/runtime/constant/baseParams.const'
import type { Filters, SchemaDefinition } from '../../src/runtime/types'

describe('buildQueryForApi', () => {
    const filters: Filters<SchemaDefinition> = {
        ...BASE_PARAMS_DEFAULTS,
        page: 2,
        tags: ['nuxt', 'dev'],
        age: 18,
        name: 'User'
    }

    it('Базовый', () => {
        const query = buildQueryForApi(filters, {})

        expect(query).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            page: 2,
            search: 'tags:nuxt,dev;age:18;name:User'
        })
    })

    it('С include', () => {
        const query = buildQueryForApi(filters, {
            apiIncludes: ['user.employee', 'user.request']
        })

        expect(query).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            page: 2,
            search: 'tags:nuxt,dev;age:18;name:User',
            include: 'user.employee,user.request'
        })
    })

    it('С исключением ключей', () => {
        const query = buildQueryForApi(filters, {
            excludeFromSearch: ['age']
        })

        expect(query).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            page: 2,
            age: 18,
            search: 'tags:nuxt,dev;name:User'
        })
    })

    it('С исключением ключей', () => {
        const query = buildQueryForApi(filters, {
            excludeFromQueryBuilder: ['age']
        })

        expect(query).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            page: 2,
            search: 'tags:nuxt,dev;name:User'
        })
    })

    it('С queryAlias', () => {
        const query = buildQueryForApi(filters, {
            queryAliases: {
                tags: 'tag_ids'
            }
        })

        expect(query).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            page: 2,
            search: 'tag_ids:nuxt,dev;age:18;name:User'
        })
    })
})
