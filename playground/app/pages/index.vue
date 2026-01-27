<template>
    <main>
        <form @submit.prevent="handleSubmit">
            <input
                v-model="filters.name"
                type="text"
                placeholder="Name"
            >
            <select
                v-model="filters.skills"
                multiple
            >
                <option value="html">
                    HTML
                </option>
                <option value="css">
                    CSS
                </option>
                <option value="javascript">
                    JavaScript
                </option>
            </select>
            <button type="submit">
                Submit
            </button>
        </form>
        <pre>
            {{ filters }}
        </pre>
        <pre>
           <code>
                {{ queryForApi }}
           </code>
        </pre>
    </main>
</template>

<script setup lang="ts">
const { filters, queryForApi, updateFilters } = useL5(
    {
        name: String,
        age: Number,
        skills: [String]
    },
    {
        defaults: {
            age: 25,
            skills: ['html', 'css']
        }
    }
)

const handleSubmit = () => {
    updateFilters({ ...filters.value })
}
</script>
