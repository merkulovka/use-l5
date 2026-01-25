<template>
    <section class="space-y-8">
        <div class="flex flex-col gap-4">
            <UBadge
                size="lg"
                variant="soft"
                color="info"
                class="w-fit"
            >
                Динамические defaults
            </UBadge>
            <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                <template #header>
                    <div class="flex items-center justify-between gap-2">
                        <div>
                            <p class="text-sm text-slate-400">
                                updateDefaults + синхронизация с роутом
                            </p>
                            <h2 class="text-xl font-semibold text-white">
                                Работа с baseline значениями
                            </h2>
                        </div>
                        <UBadge color="gray">
                            defaultsRef
                        </UBadge>
                    </div>
                </template>
                <div class="grid gap-6 lg:grid-cols-[1.1fr,1fr]">
                    <div class="space-y-4">
                        <UFieldGroup label="Имя по умолчанию">
                            <UInput
                                v-model="defaultsRef.name"
                                placeholder="Имя"
                                icon="i-ph-identification-card"
                            />
                        </UFieldGroup>
                        <UFieldGroup label="Проекты (array defaults)">
                            <USelectMenu
                                v-model="defaultsRef.h_ids"
                                multiple
                                searchable
                                :options="projects"
                                option-attribute="label"
                                value-attribute="value"
                            />
                        </UFieldGroup>
                        <div class="flex flex-wrap gap-2">
                            <UButton
                                color="primary"
                                icon="i-ph-floppy-disk"
                                @click="saveDefaults"
                            >
                                Сохранить defaults
                            </UButton>
                            <UButton
                                color="emerald"
                                variant="soft"
                                icon="i-ph-check-circle"
                                @click="applyDefaults"
                            >
                                Применить defaults в filters
                            </UButton>
                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-ph-arrow-counter-clockwise"
                                @click="resetRouteValues"
                            >
                                Очистить query
                            </UButton>
                        </div>
                        <UAlert
                            color="primary"
                            variant="subtle"
                            title="Сценарий"
                            description="Меняем baseline, потом синхронизируем filters без ручных мутаций."
                        />
                    </div>
                    <div class="space-y-4">
                        <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                            <template #header>
                                <p class="text-sm font-medium text-white">
                                    defaultsRef
                                </p>
                            </template>
                            <pre
                                class="text-xs text-left whitespace-pre-wrap break-words text-slate-100"
                            >{{ defaultsJson }}</pre>
                        </UCard>
                        <UCard class="bg-slate-900/60 ring-1 ring-white/5">
                            <template #header>
                                <p class="text-sm font-medium text-white">
                                    filters / queryForApi
                                </p>
                            </template>
                            <div class="grid gap-3">
                                <pre
                                    class="text-xs text-left whitespace-pre-wrap break-words text-slate-100"
                                >{{ filtersJson }}</pre>
                                <pre
                                    class="text-xs text-left whitespace-pre-wrap break-words text-emerald-100"
                                >{{ apiJson }}</pre>
                            </div>
                        </UCard>
                    </div>
                </div>
            </UCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from '#imports'

const projects = [
    { label: 'Пилот', value: 1 },
    { label: 'Прод', value: 2 },
    { label: 'Исследование', value: 3 },
    { label: 'Эксперимент', value: 4 }
]

const { filters, queryForApi, updateDefaults, updateFilters, defaultsRef }
    = useL5(
        {
            name: String,
            h_ids: [Number]
        },
        {
            syncWithRoute: true,
            defaults: {
                name: 'Kirill',
                h_ids: [1, 2, 3]
            }
        }
    )

const defaultsJson = computed(() => JSON.stringify(defaultsRef.value, null, 2))
const filtersJson = computed(() => JSON.stringify(filters.value, null, 2))
const apiJson = computed(() => JSON.stringify(queryForApi.value, null, 2))

function saveDefaults() {
    updateDefaults({
        name: defaultsRef.value.name,
        h_ids: defaultsRef.value.h_ids
    })
}

function applyDefaults() {
    updateFilters({
        name: defaultsRef.value.name,
        h_ids: defaultsRef.value.h_ids
    })
}

function resetRouteValues() {
    updateFilters(
        {
            name: null,
            h_ids: []
        },
        {
            urlUpdateStrategy: 'replace'
        }
    )
}
</script>
