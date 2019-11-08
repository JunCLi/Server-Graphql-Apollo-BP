const userResolvers = require('./placeholderResolvers')

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
