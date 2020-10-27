const userResolvers = require('./usersResolvers')

const resolvers = [
	userResolvers,
]

const queries = {}
const mutations = {}

resolvers.forEach(resolver => {
	for (let query in resolver.Query) {
		queries[query] = resolver.Query[query]
	}
	for (let mutation in resolver.Mutation) {
		mutations[mutation] = resolver.Mutation[mutation]
	}
})

module.exports = () => {
  return {
    Query: {
			...queries,
		},

		Mutation: {
			...mutations,
		},
  }
}
