<template>
    <main>
        <select
            v-model="filters.sorted"
            @update:model-value="update"
        >
            <option
                v-for="option in optionsSelect"
                :key="option.name"
                :value="option.value"
            >
                {{ option.name }}
            </option>
        </select>
        <pre>
            {{ filters }}
        </pre>
        <pre>
            {{ queryForApi }}
        </pre>
    </main>
</template>

<script setup lang="ts">
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

const { filters, queryForApi, updateFilters } = useL5({
    sorted: String
}, {
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
})

function update() {
    updateFilters({
        ...filters.value
    })
}
</script>
