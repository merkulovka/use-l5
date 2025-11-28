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
</script>
