import { describe, expect, it } from 'vitest'
import { parseFiltersFromQuery } from '../../src/runtime/utils/parseFiltersFromQuery'
import type { SchemaDefinition } from '../../src/runtime/types'
import { BASE_PARAMS_DEFAULTS } from '../../src/runtime/constant/baseParams.const'

describe('parseFiltersFromQuery', () => {
    const scheme: SchemaDefinition = {
        status: Boolean,
        age: Number,
        name: String,
        tags: [String]
    }

    it('Базовый', () => {
        const filters = parseFiltersFromQuery(scheme, {
            status: '0',
            page: '2',
            tags: 'nuxt'
        }, {
            defaults: {
            }
        })

        expect(filters).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            status: false,
            page: 2,
            tags: ['nuxt'],
            name: null,
            age: null
        })
    })

    it('С дефолтными значениями', () => {
        const filters = parseFiltersFromQuery(scheme, {
            status: '0',
            page: '2',
            tags: ['nuxt', 'vue']
        }, {
            defaults: {
                name: 'test',
                age: 18
            }
        })

        expect(filters).toEqual({
            ...BASE_PARAMS_DEFAULTS,
            status: false,
            page: 2,
            tags: ['nuxt', 'vue'],
            name: 'test',
            age: 18
        })
    })
})
