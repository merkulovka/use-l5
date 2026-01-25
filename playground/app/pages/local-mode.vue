<template>
    <section class="space-y-8">
        <div class="flex flex-col gap-4">
            <UBadge
                size="lg"
                variant="soft"
                color="info"
                class="w-fit"
            >
                Локальный режим (без route sync)
            </UBadge>
            <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                <template #header>
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <p class="text-sm text-slate-400">
                                syncWithRoute=false, но buildQueryForApi
                                остаётся
                            </p>
                            <h2 class="text-xl font-semibold text-white">
                                Быстрый поиск без изменения URL
                            </h2>
                        </div>
                        <UBadge color="gray">
                            debounce friendly
                        </UBadge>
                    </div>
                </template>
                <div class="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
                    <div class="space-y-4">
                        <UFieldGroup
                            label="Поиск"
                            description="Не трогает query params"
                        >
                            <UInput
                                v-model="filters.search"
                                icon="i-ph-magnifying-glass"
                                placeholder="Например, &quot;design system&quot;"
                                @update:model-value="
                                    (value) => updateFilters({ search: value })
                                "
                            />
                        </UFieldGroup>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <UFieldGroup label="Статус">
                                <URadioGroup
                                    v-model="filters.status"
                                    :options="statusOptions"
                                    color="primary"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({ status: value })
                                    "
                                />
                            </UFieldGroup>
                            <UFieldGroup label="Теги">
                                <USelectMenu
                                    v-model="filters.tags"
                                    multiple
                                    searchable
                                    :options="tags"
                                    option-attribute="label"
                                    value-attribute="value"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({ tags: value ?? [] })
                                    "
                                />
                            </UFieldGroup>
                        </div>
                        <div class="grid gap-3 sm:grid-cols-2">
                            <UFieldGroup label="Page">
                                <UInput
                                    v-model="filters.page"
                                    type="number"
                                    min="1"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                page: Number(value)
                                            })
                                    "
                                />
                            </UFieldGroup>
                            <UFieldGroup label="Limit">
                                <UInput
                                    v-model="filters.limit"
                                    type="number"
                                    min="5"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                limit: Number(value)
                                            })
                                    "
                                />
                            </UFieldGroup>
                        </div>
                        <UButton
                            color="primary"
                            icon="i-ph-paper-plane-tilt"
                            @click="refreshQuery"
                        >
                            Пересобрать queryForApi
                        </UButton>
                    </div>
                    <div class="space-y-3">
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
                                    queryForApi
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
import { computed } from '#imports'

const tags = [
    { label: 'UI', value: 'ui' },
    { label: 'Backend', value: 'backend' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Docs', value: 'docs' }
]

const statusOptions = [
    { label: 'Все', value: 'all' },
    { label: 'Черновики', value: 'draft' },
    { label: 'Опубликовано', value: 'published' }
]

const { filters, queryForApi, updateFilters } = useL5(
    {
        search: String,
        status: String,
        tags: [String],
        page: Number,
        limit: Number
    },
    {
        syncWithRoute: false,
        defaults: {
            search: '',
            status: 'all',
            tags: ['ui'],
            page: 1,
            limit: 10
        },
        excludeFromSearch: ['status', 'tags']
    }
)

const filtersJson = computed(() => JSON.stringify(filters.value, null, 4))
const apiJson = computed(() => JSON.stringify(queryForApi.value, null, 4))

function refreshQuery() {
    updateFilters({
        ...filters.value
    })
}
</script>
