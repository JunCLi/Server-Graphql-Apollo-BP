const { DataSource } = require('apollo-datasource')
const { createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')

class DBFunctions extends DataSource {
	constructor() {
		super()

		this.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	}

	initialize(config) {
		this.context = config.context
	}

	async generateID(idLength) {
		let id = ''

		for (let i = 0; i < idLength; i++) {
			id += this.ALPHABET.charAt(Math.floor(Math.random() * this.ALPHABET.length))
		}
	
		return id
	}

	async uniqueIDGenerator(checkColumn, table, idLength) {
		try {
			const id = await this.generateID(idLength)

			const checkDuplicateIdQuery = createSelectQuery([checkColumn], table, checkColumn, id)
			const checkDuplicateIdResult = await this.context.postgres.query(checkDuplicateIdQuery)

			if (checkDuplicateIdResult.rows.length) return await this.uniqueIDGenerator(checkColumn, table, idLength)

			return id
		} catch(err) {
			throw err
		}
	}
}

module.exports = DBFunctions