<template>
    <div
        class="min-h-screen bg-slate-950 text-slate-50 relative overflow-hidden"
    >
        <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-slate-900 opacity-70"
        />
        <div
            class="pointer-events-none absolute -right-10 top-12 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <div
            class="pointer-events-none absolute -left-10 bottom-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl"
        />
        <div class="relative">
            <UNotifications />
            <UContainer class="py-8">
                <header
                    class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <NuxtLink
                        to="/"
                        class="flex items-center gap-3 font-semibold text-lg tracking-tight text-slate-100 hover:text-white transition"
                    >
                        <span
                            class="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-200 ring-1 ring-primary-400/30"
                        >
                            L5
                        </span>
                        <span class="leading-tight"> useL5 Playground </span>
                    </NuxtLink>
                    <nav class="flex flex-wrap gap-2 text-sm">
                        <UButton
                            to="/"
                            color="gray"
                            variant="ghost"
                            size="sm"
                        >
                            Базовый пример
                        </UButton>
                        <UButton
                            to="/transform"
                            color="gray"
                            variant="ghost"
                            size="sm"
                        >
                            Трансформеры
                        </UButton>
                        <UButton
                            to="/update-defaults"
                            color="gray"
                            variant="ghost"
                            size="sm"
                        >
                            Управление defaults
                        </UButton>
                        <UButton
                            to="/local-mode"
                            color="gray"
                            variant="ghost"
                            size="sm"
                        >
                            Локальный режим
                        </UButton>
                    </nav>
                </header>
            </UContainer>
            <main class="pb-16">
                <UContainer>
                    <slot />
                </UContainer>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
