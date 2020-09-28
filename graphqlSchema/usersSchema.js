const { gql } = require('apollo-server-express')

module.exports = gql`
	scalar Date

	extend type Query {
		getLoggedUser: User
		getUserFromId(id: ID!): User
	}

	type User {
		userId: ID!
		email: String
		dateCreated: Date!
		lastModified: Date!
		firstName: String
		lastName: String
	}

	extend type Mutation {
		signup(input: SignupObject!): Response!
		login(input: LoginObject!): LoginResponse!
		logout: Response!
		testAuthenticate: Response!
	}

	input SignupObject {
		email: String!
		password: String!
		firstName: String
		lastName: String
	}

	input LoginObject {
		email: String!
		password: String!
	}

	type Response {
		message: String!
	}

	type LoginResponse {
		message: String!
		token: String!
		user: User!
	}
`

