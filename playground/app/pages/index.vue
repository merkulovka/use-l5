<template>
    <main>
        <button
            type="button"
            @click="update"
        >
            updateFilters
        </button>
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
    name: String,
    age: Number,
    some_key_for_transform: Boolean,
    family_name: String,
    category_id: [Number],
    days_of_week: [Number],
    brother_names: [String],
    is_active: Boolean
}, {
    syncWithRoute: true,
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
    apiIncludes: [
        'user.employees',
        'user.workplace'
    ],
    transformOutput: (_filters) => {
        return {
            ..._filters,
            some_key_for_transform: _filters.some_key_for_transform ? 'yes' : 'no'
        }
    }
})

function update() {
    updateFilters({
        category_id: [1, 2, 3, 4, 5, 6, 7, 8],
        name: 'Username',
        is_active: true
    })
}
</script>
