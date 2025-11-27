<template>
    <main>
        <pre>
<!--            {{filters}}-->
        </pre>
        <pre>
            {{ queryForApi }}
        </pre>
    </main>
</template>

<script setup lang="ts">
const {filters, queryForApi} = useL5({
    name: String,
    age: Number,
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
    excludeFromSearch: ['days_of_week'],
    apiIncludes: [
        'user.employees',
        'user.workplace'
    ]
})
</script>
