<template>
    <div>
        <header>
            <NuxtLink to="/?name=131dasd&age=2&category_id=2&date=2018-09-12&page=3&some_key_for_transform=1">
                Обычный пример
            </NuxtLink>
            <NuxtLink to="/transform">
                Трансформеры
            </NuxtLink>
        </header>
        <slot />
    </div>
</template>

<script setup lang="ts"></script>
