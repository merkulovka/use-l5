<template>
    <section class="space-y-8">
        <div class="flex flex-col gap-4">
            <UBadge
                size="lg"
                variant="soft"
                color="info"
                class="w-fit"
            >
                Трансформация вывода
            </UBadge>
            <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                <template #header>
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <p class="text-sm text-slate-400">
                                transformOutput: один селект -> несколько полей
                                в API
                            </p>
                            <h2 class="text-xl font-semibold text-white">
                                Пресеты сортировки
                            </h2>
                        </div>
                        <UBadge color="gray">
                            excludeFromQueryBuilder: sorted
                        </UBadge>
                    </div>
                </template>
                <div class="grid gap-6 lg:grid-cols-[1.2fr,1fr]">
                    <div class="space-y-4">
                        <UFieldGroup
                            label="Сценарий сортировки"
                            description="Обновляет orderBy/sortedBy, но не попадает в search-builder"
                        >
                            <USelect
                                v-model="filters.sorted"
                                :options="optionsSelect"
                                option-attribute="name"
                                value-attribute="value"
                                class="w-full"
                                @update:model-value="
                                    (value) => updateFilters({ sorted: value })
                                "
                            />
                        </UFieldGroup>
                        <UCard class="bg-slate-800/60 ring-1 ring-white/5">
                            <template #header>
                                <div class="flex items-center justify-between">
                                    <p class="text-sm text-white">
                                        Текущее правило
                                    </p>
                                    <UBadge
                                        color="primary"
                                        variant="soft"
                                    >
                                        {{ sortedLabel }}
                                    </UBadge>
                                </div>
                            </template>
                            <div class="text-sm text-slate-200">
                                <p class="flex items-center gap-2">
                                    <span class="text-slate-400">orderBy:</span>
                                    <code
                                        class="rounded bg-slate-900/60 px-2 py-1"
                                    >{{
                                        currentPreset.orderBy || "—"
                                    }}</code>
                                </p>
                                <p class="mt-2 flex items-center gap-2">
                                    <span class="text-slate-400">sortedBy:</span>
                                    <code
                                        class="rounded bg-slate-900/60 px-2 py-1"
                                    >{{
                                        currentPreset.sortedBy || "—"
                                    }}</code>
                                </p>
                            </div>
                        </UCard>
                        <div class="flex gap-3">
                            <UButton
                                color="primary"
                                icon="i-ph-arrows-clockwise"
                                @click="touchFilter"
                            >
                                Обновить фильтры
                            </UButton>
                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-ph-link-simple-horizontal"
                                @click="copyLink"
                            >
                                Скопировать ссылку
                            </UButton>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                            <template #header>
                                <p class="text-sm font-medium text-white">
                                    filters
                                </p>
                            </template>
                            <pre
                                class="text-xs text-left whitespace-pre-wrap break-words text-slate-100"
                            >{{ filtersJson }}</pre>
                        </UCard>
                        <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                            <template #header>
                                <p class="text-sm font-medium text-white">
                                    queryForApi (transformOutput)
                                </p>
                            </template>
                            <pre
                                class="text-xs text-left whitespace-pre-wrap break-words text-emerald-100"
                            >{{ apiJson }}</pre>
                        </UCard>
                    </div>
                </div>
            </UCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, useRoute } from '#imports'

const optionsSelect = [
    {
        name: 'Популярные',
        value: 'popular'
    },
    {
        name: 'Дешевле',
        value: 'cheap'
    },
    {
        name: 'Дороже',
        value: 'expensive'
    },
    {
        name: 'С высоким рейтингом',
        value: 'rating'
    }
]

const valuesSelect = {
    popular: {
        orderBy: '',
        sortedBy: ''
    },
    cheap: {
        orderBy: 'total_price',
        sortedBy: 'asc'
    },
    expensive: {
        orderBy: 'total_price',
        sortedBy: 'desc'
    },
    rating: {
        orderBy: 'rating',
        sortedBy: 'desc'
    }
}

const { filters, queryForApi, updateFilters } = useL5(
    {
        sorted: String
    },
    {
        syncWithRoute: true,
        excludeFromQueryBuilder: ['sorted'],
        defaults: {
            sorted: 'popular'
        },
        transformOutput: (_filters) => {
            const { orderBy, sortedBy } = valuesSelect[_filters.sorted]
            return {
                ..._filters,
                test: _filters.sorted,
                orderBy,
                sortedBy
            }
        }
    }
)

const sortedLabel = computed(
    () =>
        optionsSelect.find(option => option.value === filters.value.sorted)
            ?.name ?? '—'
)
const filtersJson = computed(() => JSON.stringify(filters.value, null, 2))
const apiJson = computed(() => JSON.stringify(queryForApi.value, null, 2))
const currentPreset = computed(() => valuesSelect[filters.value.sorted])

const route = useRoute()

function touchFilter() {
    updateFilters({
        ...filters.value
    })
}

async function copyLink() {
    if (typeof window === 'undefined' || !window.navigator?.clipboard) return
    await window.navigator.clipboard.writeText(
        window.location.origin + route.fullPath
    )
}
</script>
