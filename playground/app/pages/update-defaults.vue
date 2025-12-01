<template>
    <main>
        <button @click="updateD">
            updateDefaults
        </button>
        <button @click="updateF">
            updateDefaults
        </button>
        <pre>
            {{ filters }}
        </pre>
        <pre>
            {{ queryForApi }}
        </pre>
        <pre>
            {{ defaultsRef }}
        </pre>
    </main>
</template>

<script setup lang="ts">
const { filters, queryForApi, updateDefaults, updateFilters, defaultsRef } = useL5({
    name: String,
    h_ids: [Number]
}, {
    syncWithRoute: true,
    defaults: {
        name: 'Kirill',
        h_ids: [1, 2, 3]
    }
})

function updateD() {
    updateDefaults({
        h_ids: [1, 2, 3, 4]
    })
}

function updateF() {
    updateFilters({
        name: 'Kirill',
        h_ids: [1, 2, 3]
    })
}
</script>
