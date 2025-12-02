import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { LocationQuery } from 'vue-router'
import type { SchemaDefinition } from '../src/runtime/types'
import { useL5 } from '../src/runtime/composables/useL5'

let mockRouteQuery: LocationQuery = {}
const routerPush = vi.fn()
const routerReplace = vi.fn()

vi.mock('#imports', async () => {
    const vue = await vi.importActual<typeof import('vue')>('vue')
    return {
        ...vue,
        useRoute: () => ({ query: mockRouteQuery }),
        useRouter: () => ({
            push: routerPush,
            replace: routerReplace
        })
    }
})

const schema: SchemaDefinition = {
    status: Boolean,
    tags: [String],
    age: Number
}

function setRouteFrom(url: string) {
    const params = new URL(url).searchParams
    const nextQuery: LocationQuery = {}

    params.forEach((value, key) => {
        const current = nextQuery[key]
        if (current === undefined) {
            nextQuery[key] = value
        }
        else if (Array.isArray(current)) {
            nextQuery[key] = [...current, value]
        }
        else if (current === null) {
            nextQuery[key] = [value]
        }
        else {
            nextQuery[key] = [current, value]
        }
    })

    mockRouteQuery = nextQuery
}

describe('useL5', () => {
    beforeEach(() => {
        mockRouteQuery = {}
        routerPush.mockReset()
        routerReplace.mockReset()
    })
    //
    it('возвращает значения по умолчанию при пустом query и правильно строит поля поиска/исключения', () => {
        setRouteFrom('https://example.com/users')

        const { filters, queryForApi } = useL5(schema, {
            syncWithRoute: true,
            defaults: {
                status: true,
                tags: ['nuxt']
            },
            excludeFromSearch: ['status']
        })

        expect(filters.value).toEqual({
            status: true,
            tags: ['nuxt'],
            age: null,
            page: 1,
            limit: 10,
            sortedBy: 'id',
            orderBy: 'desc',
            searchJoin: 'and',
            searchFields: null,
            search: null
        })

        expect(queryForApi.value).toEqual({
            page: 1,
            limit: 10,
            sortedBy: 'id',
            orderBy: 'desc',
            searchJoin: 'and',
            searchFields: null,
            search: 'tags:nuxt',
            status: true
        })
    })

    it('парсит параметры query из переданного url и строит queryForApi', () => {
        setRouteFrom(
            'https://example.com/users?page=2&limit=5&sortedBy=created_at&orderBy=asc&searchJoin=or&searchFields=name:title&status=0&tags=tech&tags=ai&age=42'
        )

        const { filters, queryForApi } = useL5(schema, {
            syncWithRoute: true,
            defaults: {
                status: true
            },
            excludeFromSearch: ['status'],
            apiIncludes: ['author', 'comments']
        })

        expect(filters.value).toEqual({
            status: false,
            tags: ['tech', 'ai'],
            age: 42,
            page: 2,
            limit: 5,
            sortedBy: 'created_at',
            orderBy: 'asc',
            searchJoin: 'or',
            searchFields: 'name:title',
            search: null
        })

        expect(queryForApi.value).toEqual({
            page: 2,
            limit: 5,
            sortedBy: 'created_at',
            orderBy: 'asc',
            searchJoin: 'or',
            searchFields: 'name:title',
            search: 'tags:tech,ai;age:42',
            status: false,
            include: 'author,comments'
        })
    })

    it('updateFilters обновляет filters/queryForApi и синхронизирует маршрут при включении', () => {
        setRouteFrom('https://example.com/users')

        const { filters, queryForApi, updateFilters } = useL5(schema, {
            defaults: {
                status: false,
                tags: ['nuxt']
            },
            excludeFromSearch: ['status']
        })

        updateFilters({
            status: true,
            tags: ['nuxt', 'ai'],
            age: 30,
            page: 3,
            sortedBy: 'created_at',
            orderBy: 'asc',
            searchJoin: 'or',
            searchFields: 'name:title'
        })

        expect(filters.value).toEqual({
            status: true,
            tags: ['nuxt', 'ai'],
            age: 30,
            page: 3,
            limit: 10,
            sortedBy: 'created_at',
            orderBy: 'asc',
            searchJoin: 'or',
            searchFields: 'name:title',
            search: null
        })

        expect(queryForApi.value).toEqual({
            page: 3,
            limit: 10,
            sortedBy: 'created_at',
            orderBy: 'asc',
            searchJoin: 'or',
            searchFields: 'name:title',
            search: 'tags:nuxt,ai;age:30',
            status: true
        })
    })
})
