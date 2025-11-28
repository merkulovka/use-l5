<template>
    <main>
        <pre>
            {{ filters }}
        </pre>
        <pre>
            {{ queryForApi }}
        </pre>
    </main>
</template>

<script setup lang="ts">
const { filters, queryForApi } = useL5({
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
</script>
