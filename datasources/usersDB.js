const { DataSource } = require('apollo-datasource')

const authenticate = require('../utils/authentication/authenticate')
const { createCookie, setCookie, retrieveCookie } = require('../utils/authentication/cookieFunctions')
const { encryptPassword, comparePassword } = require('../utils/DSHelperFunctions/bcryptFunctions')
const { createInsertQuery, createUpdateQuery, createSelectQuery } = require('../utils/DSHelperFunctions/makeQueries')
const { snakeToCamel } = require('../utils/helperFuncitons/caseConv')

const databaseSchema = 'boilerplate'
const usersTable = `${databaseSchema}.users`
const blacklistTable = `${databaseSchema}.blacklist_jwt`

class UsersDB extends DataSource {
	constructor() {
		super()
	}

	initialize(config) {
		this.context = config.context
	}

	async generateId (email) {
		const emailComposite = (await encryptPassword(email)).replace('$2b$12$', '').substring(0, 12)
		const dateComposite = (await encryptPassword(`${Math.floor(Date.now() / 1000)}`)).replace('$2b$12$', '').substring(0, 12)
		return emailComposite + dateComposite	
	}

	async uniqueIDGenerator(email) {
		const id = await this.generateId(email)

		const checkIdColumns = ['id']
		const checkDuplicateIdQuery = createSelectQuery(checkIdColumns, usersTable, 'id', id)
		const checkDuplicateIdResult = await this.context.postgres.query(checkDuplicateIdQuery)
		if (checkDuplicateIdResult.rows.length) this.uniqueIDGenerator(email)

		return id
	}

	async signup(input) {
		try {
			let { email, password } = input
			email = email.toLowerCase()

			const checkDuplicateEmailColumns = [
				'email'
			]
			const checkDuplicateEmailQuery = createSelectQuery(checkDuplicateEmailColumns, usersTable, 'email', email)
			const checkDuplicateEmailResult = await this.context.postgres.query(checkDuplicateEmailQuery)
			if (checkDuplicateEmailResult.rows.length) throw 'A user with this email already exists.'

			
			const id = await this.uniqueIDGenerator(email)
			console.log(id)
			const hashedPassword = await encryptPassword(password)
			const insertUserObject = {
				...input,
				id: id,
				password: hashedPassword,
				email: email,
			}
			const insertUserQuery = createInsertQuery(insertUserObject, usersTable)
			await this.context.postgres.query(insertUserQuery)

			return { message: 'success' }
		} catch(err) {
			throw err
		}
	}

	async login(input) {
		try {
			let { email, password } = input
			email = email.toLowerCase()
			console.log('test')

			const getUserColumns = [
				'id',
				'email',
				'firstName',
				'lastName',
				'password',
			]
			const getUserQuery = createSelectQuery(getUserColumns, usersTable, 'email', email)
			const getUserResult = snakeToCamel(await this.context.postgres.query(getUserQuery))
			if (!getUserResult.rows.length) throw "A user with this email doesn't exist"

			const { id: userId, password: dbPassword, firstName, lastName } = getUserResult.rows[0]
			if (!await comparePassword(password, dbPassword)) throw 'Incorrect password'

			const tokenData = {
				userId: userId
			}
			const myJWTToken = await createCookie(tokenData)
			setCookie(myJWTToken, this.context.req.res)

			return {
				message: 'success',
				token: myJWTToken,
				user: {
					email: email,
					userId: userId,
					firstName: firstName,
					lastName: lastName,
				}
			}
		} catch(err) {
			throw err
		}
	}

	async logout(input) {
		try {
			const jwtCookie = retrieveCookie(this.context.req)
			const { token, exp, iat } = jwtCookie
			const { userId } = jwtCookie.data

			const blacklistJWTObject = {
				userId: userId,
				token: token,
				tokenIssued: iat,
				tokenExpiration: exp
			}

			const blacklistJWTQuery = createInsertQuery(blacklistJWTObject, blacklistTable)
			await this.context.postgres.query(blacklistJWTQuery)

			return { message: 'success' }
		} catch(err) {
			throw err
		}
	}

	async getLoggedUser(input) {
		try {
			const tokenData = await authenticate(this.context.req, blacklistTable, this.context.postgres)
			const { userId } = tokenData

			const user = await this.getUserFromId(userId)

			return {
				userId,
				...user,
			}

		} catch(err) {
			throw err
		}
	}

	async getUserFromId(userId) {
		try {
			const getUserColumns = [
				'email',
				'firstName',
				'lastName',
				'dateCreated',
				'lastModified',
			]
			const getUserQuery = createSelectQuery(getUserColumns, usersTable, 'id', userId)
			const getUserResult = snakeToCamel(await this.context.postgres.query(getUserQuery))

			if (!getUserResult.rows.length) throw 'An user with this ID does not exist'

			return { 
				...getUserResult.rows[0],
				userId: userId,
			}
		} catch(err) {
			throw err
		}
	}
}

module.exports = UsersDB