const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    placeholder: QueryPlaceholder
  }

	type QueryPlaceholder {
		id: ID
	}

	type Mutation {
		placeholder: MutationPlaceholder
	}

	type MutationPlaceholder {
		id: ID
	}
`

