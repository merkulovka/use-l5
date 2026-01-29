# use-l5

Nuxt-модуль с типизированным `useL5`-композаблом для парсинга фильтров, синхронизации с query в роуте и сборки параметров для API/URL.

## Возможности

- типизированная схема фильтров на основе конструкторов `String/Number/Boolean`
- двусторонняя синхронизация с `route.query` (опционально)
- генерация параметров для API и URL
- базовые параметры пагинации и сортировки

## Установка

```bash
npx nuxi module add use-l5
```

или

```bash
pnpm add use-l5
```

## Настройка модуля

`nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['use-l5'],
  useL5: {
    syncWithRoute: true,
    urlUpdateStrategy: 'replace',
    boolToNumber: true
  }
})
```

## Базовое использование

```ts
import { useL5 } from '#imports'

const schema = {
  q: String,
  category: [String],
  inStock: Boolean,
  price: Number
}

const { filters, queryForApi, updateFilters, updateDefaults } = useL5(schema, {
  defaults: {
    category: [],
    inStock: false
  },
  syncWithRoute: true,
  urlUpdateStrategy: 'push'
})

updateFilters({ q: 'mac', category: ['laptops'] })
```

## Параметры `useL5`

```ts
interface Options<S> {
  defaults?: Partial<InferFromL5Schema<S>>
  syncWithRoute?: boolean
  excludeFromSearch?: (keyof S)[]
  apiIncludes?: string[]
  excludeFromQueryBuilder?: (keyof S)[]
  boolToNumber?: boolean
  queryAliases?: Partial<Record<keyof S, string>>
  transformInput?: (query: Partial<S>) => Partial<S>
  transformOutput?: (filters: Filters<S>) => Record<keyof S & keyof BaseParams, unknown>
  urlUpdateStrategy?: 'replace' | 'push'
}
```

## Базовые параметры (BaseParams)

Всегда доступны и участвуют в сборке запросов:

- `page` (по умолчанию 1)
- `limit` (по умолчанию 10)
- `sortedBy` (по умолчанию `id`)
- `orderBy` (по умолчанию `desc`)
- `searchJoin` (по умолчанию `and`)
- `searchFields` (по умолчанию `null`)
- `search` (по умолчанию `null`)

## Утилиты

Модуль автоматически добавляет импорты:

```ts
import { buildQueryForApi, parseFiltersFromQuery } from '#imports'
```

- `buildQueryForApi(filters, options)` — сборка параметров для API
- `parseFiltersFromQuery(schema, query, { defaults })` — парсинг query в фильтры

## Возврат `useL5`

```ts
interface UseL5Return<S> {
  filters: Ref<Filters<S>>
  queryForApi: ShallowRef<Record<string, unknown>>
  updateFilters: (newFilters: Partial<Filters<S>>, options?: { urlUpdateStrategy?: 'replace' | 'push' }) => void
  updateDefaults: (newDefaults: Partial<InferFromL5Schema<S>>) => void
  defaultsRef: Ref<Partial<InferFromL5Schema<S>>>
}
```

## Лицензия

MIT
