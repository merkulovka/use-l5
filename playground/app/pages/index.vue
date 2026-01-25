<template>
    <section class="space-y-8 pb-6">
        <div class="flex flex-col gap-4">
            <UBadge
                size="lg"
                variant="soft"
                color="primary"
                class="w-fit"
            >
                Синхронизация с роутом + сборка query
            </UBadge>
            <div class="grid gap-6 md:grid-cols-[2fr,1.2fr]">
                <UCard
                    class="backdrop-blur bg-slate-900/60 ring-1 ring-white/5"
                >
                    <template #header>
                        <div class="flex items-center justify-between gap-2">
                            <div>
                                <p class="text-sm text-slate-400">
                                    Отдельные поля обновляют query и
                                    API-параметры
                                </p>
                                <h1 class="text-xl font-semibold text-white">
                                    Основной пример useL5
                                </h1>
                            </div>
                            <UBadge color="neutral">
                                syncWithRoute=true
                            </UBadge>
                        </div>
                    </template>
                    <div class="grid gap-4 md:grid-cols-2">
                        <div class="space-y-3">
                            <p
                                class="text-xs uppercase tracking-[0.2em] text-slate-400"
                            >
                                Основные фильтры
                            </p>
                            <UFieldGroup label="Имя">
                                <UInput
                                    v-model="filters.name"
                                    icon="i-ph-user"
                                    placeholder="Введите имя"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                name: value || null
                                            })
                                    "
                                />
                            </UFieldGroup>
                            <UFieldGroup label="Возраст">
                                <UInput
                                    v-model="filters.age"
                                    type="number"
                                    icon="i-ph-number-circle-nine"
                                    placeholder="18"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                age: value
                                                    ? Number(value)
                                                    : null
                                            })
                                    "
                                />
                            </UFieldGroup>
                            <UFieldGroup label="Категории">
                                <USelectMenu
                                    v-model="filters.category_id"
                                    multiple
                                    searchable
                                    :options="categoryOptions"
                                    option-attribute="label"
                                    value-attribute="value"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                category_id: value ?? []
                                            })
                                    "
                                />
                            </UFieldGroup>
                            <UFieldGroup label="Дни недели (мульти)">
                                <USelectMenu
                                    v-model="filters.days_of_week"
                                    multiple
                                    :options="daysOptions"
                                    option-attribute="label"
                                    value-attribute="value"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                days_of_week: value ?? []
                                            })
                                    "
                                />
                            </UFieldGroup>
                        </div>
                        <div class="space-y-3">
                            <p
                                class="text-xs uppercase tracking-[0.2em] text-slate-400"
                            >
                                Дополнительно
                            </p>
                            <div
                                class="flex items-center justify-between rounded-xl bg-slate-800/80 px-4 py-3 ring-1 ring-white/5"
                            >
                                <div>
                                    <p class="text-sm font-medium">
                                        Активен
                                    </p>
                                    <p class="text-xs text-slate-400">
                                        boolToNumber -> 1/0
                                    </p>
                                </div>
                                <USwitch
                                    v-model="filters.is_active"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({ is_active: value })
                                    "
                                />
                            </div>
                            <div
                                class="flex items-center justify-between rounded-xl bg-slate-800/80 px-4 py-3 ring-1 ring-white/5"
                            >
                                <div>
                                    <p class="text-sm font-medium">
                                        Трансформер поиска
                                    </p>
                                    <p class="text-xs text-slate-400">
                                        Исключён из search, но участвует в API
                                    </p>
                                </div>
                                <UCheckbox
                                    v-model="filters.some_key_for_transform"
                                    label="some_key_for_transform"
                                    @update:model-value="
                                        (value) =>
                                            updateFilters({
                                                some_key_for_transform: value
                                            })
                                    "
                                />
                            </div>
                            <div class="grid gap-2 sm:grid-cols-2">
                                <UButton
                                    v-for="preset in presets"
                                    :key="preset.label"
                                    block
                                    color="primary"
                                    variant="soft"
                                    @click="() => applyPreset(preset)"
                                >
                                    {{ preset.label }}
                                </UButton>
                            </div>
                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-ph-arrow-counter-clockwise"
                                @click="resetFilters"
                            >
                                Сбросить к defaults
                            </UButton>
                        </div>
                    </div>
                </UCard>
                <div class="space-y-4">
                    <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white">
                                    filters (reactive)
                                </p>
                                <UBadge color="gray">
                                    page resets on change
                                </UBadge>
                            </div>
                        </template>
                        <pre
                            class="text-xs text-left whitespace-pre-wrap break-words text-slate-200"
                        >{{ filtersJson }}</pre>
                    </UCard>
                    <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                        <template #header>
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-white">
                                    queryForApi
                                </p>
                                <UBadge
                                    color="emerald"
                                    variant="soft"
                                >
                                    готово для бэкенда
                                </UBadge>
                            </div>
                        </template>
                        <pre
                            class="text-xs text-left whitespace-pre-wrap break-words text-emerald-100"
                        >{{ apiJson }}</pre>
                    </UCard>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from '#imports'

const categoryOptions = [
    { label: 'Маркетинг', value: 1 },
    { label: 'Технологии', value: 2 },
    { label: 'HR', value: 3 },
    { label: 'Финансы', value: 4 }
]

const daysOptions = [
    { label: 'Понедельник', value: 1 },
    { label: 'Вторник', value: 2 },
    { label: 'Среда', value: 3 },
    { label: 'Четверг', value: 4 },
    { label: 'Пятница', value: 5 },
    { label: 'Суббота', value: 6 },
    { label: 'Воскресенье', value: 7 }
]

const { filters, queryForApi, updateFilters } = useL5(
    {
        name: String,
        age: Number,
        some_key_for_transform: Boolean,
        family_name: String,
        category_id: [Number],
        days_of_week: [Number],
        brother_names: [String],
        is_active: Boolean
    },
    {
        syncWithRoute: true,
        boolToNumber: true,
        resetPaginationWhenUpdate: true,
        defaults: {
            family_name: 'Merkulov',
            days_of_week: [6, 4, 87, 1]
        },
        excludeFromSearch: ['days_of_week', 'some_key_for_transform'],
        excludeFromQueryBuilder: ['name'],
        queryAliases: {
            category_id: 'categories',
            days_of_week: 'daysOfWeek'
        },
        apiIncludes: ['user.employees', 'user.workplace']
    }
)

const presets = [
    {
        label: 'Горячие лиды',
        values: {
            is_active: true,
            category_id: [1, 2],
            days_of_week: [2, 4],
            age: 24,
            name: 'Alex'
        }
    },
    {
        label: 'Премиум клиенты',
        values: {
            is_active: true,
            category_id: [4],
            days_of_week: [5, 6],
            age: 30,
            some_key_for_transform: true
        }
    }
]

const filtersJson = computed(() => JSON.stringify(filters.value, null, 4))
const apiJson = computed(() => JSON.stringify(queryForApi.value, null, 4))

function applyPreset(preset: { values: Record<string, unknown> }) {
    updateFilters(preset.values)
}

function resetFilters() {
    updateFilters({
        name: null,
        age: null,
        category_id: [],
        days_of_week: [],
        is_active: false,
        some_key_for_transform: false
    })
}
</script>
