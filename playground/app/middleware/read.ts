export default defineNuxtRouteMiddleware((to) => {
    const filters = parseFiltersFromQuery(
        {
            name: String,
            age: Number,
            skills: [String],
            friends: [Number]
        },
        to.query,
        {
            defaults: {
                name: 'Kirill'
            }
        }
    )

    const queryForApi = buildQueryForApi(filters, {
        excludeFromSearch: ['age']
    })
    console.log(filters)
    console.log(queryForApi)
})
