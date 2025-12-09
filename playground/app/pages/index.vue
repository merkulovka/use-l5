<template>
    <main>
        <button
            type="button"
            @click="update"
        >
            updateFilters
        </button>

        <div style="display: flex">
            <pre>
            {{ filters }}
        </pre>
            <pre>
            {{ queryForApi }}
        </pre>
        </div>
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
    apiIncludes: [
        'user.employees',
        'user.workplace'
    ]
})

function update() {
    updateFilters({
        is_active: true,
        some_key_for_transform: true
    })
}
</script>
