import { describe, expect, it } from 'vitest'
import { buildQueryForUrl } from '../../src/runtime/utils/buildQueryForUrl'
import { BASE_PARAMS_DEFAULTS } from '../../src/runtime/constant/baseParams.const'
import type { Filters, SchemaDefinition } from '../../src/runtime/types'

describe('buildQueryForUrl', () => {
    const filters: Filters<SchemaDefinition> = {
        ...BASE_PARAMS_DEFAULTS,
        page: 2,
        tags: ['nuxt', 'dev'],
        age: 18,
        name: 'User',
        is_active: true,
        status: false
    }

    it('Базовый', () => {
        const query = buildQueryForUrl(filters, {
            defaults: {}
        })

        expect(query).toEqual({
            page: 2,
            age: 18,
            name: 'User',
            is_active: true,
            status: false,
            tags: ['nuxt', 'dev']
        })
    })

    it('С дефолтными', () => {
        const query = buildQueryForUrl(filters, {
            defaults: {
                age: 18,
                is_active: true
            }
        })

        expect(query).toEqual({
            page: 2,
            name: 'User',
            status: false,
            tags: ['nuxt', 'dev']
        })
    })

    it('Не добавляет массив, совпадающий с дефолтом, даже если порядок отличается', () => {
        const query = buildQueryForUrl(filters, {
            defaults: {
                tags: ['dev', 'nuxt']
            }
        })

        expect(query).toEqual({
            page: 2,
            age: 18,
            name: 'User',
            is_active: true,
            status: false
        })
    })

    it('Сохраняет числовой 0 и false значения', () => {
        const query = buildQueryForUrl({
            ...filters,
            attempts: 0
        }, {
            defaults: {}
        })

        expect(query).toEqual({
            page: 2,
            age: 18,
            name: 'User',
            is_active: true,
            status: false,
            tags: ['nuxt', 'dev'],
            attempts: 0
        })
    })
})
