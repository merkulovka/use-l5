<template>
    <main>
        <input
            v-model="isChecked"
            type="checkbox"
        >
        <pre>
            {{ filters }}
        </pre>
        <pre>
            {{ queryForApi }}
        </pre>
    </main>
</template>

<script setup lang="ts">
const { filters, queryForApi, updateFilters } = useL5({
    sorted: String
}, {
    syncWithRoute: true,
    excludeFromQueryBuilder: ['sorted'],
    transformOutput: (_filters) => {
        const isPrice = _filters.sorted === 'price'
        return {
            ..._filters,
            orderBy: isPrice ? 'desc' : 'asc',
            sortedBy: isPrice ? 'price' : 'id'
        }
    }
})

const isChecked = ref<boolean>(false)

watch(isChecked, (val: boolean) => {
    if (val) {
        updateFilters({
            sorted: 'price'
        })
    }
    else {
        updateFilters({
            sorted: null
        })
    }
})
</script>
