const userResolvers = require('./userResolvers')

module.exports = () => {
  return {
    Query: {
			...userResolvers.Query
		},

		Mutation: {
			...userResolvers.Mutation
		},
  }
}
