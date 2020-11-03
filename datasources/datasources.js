const DBFunctions = require('./DBFunctions')
const UsersDB = require('./usersDB')
const PlaceholderApi = require('./placeholderApi')

const dataSources = () => ({
	DBFunctions: new DBFunctions(),
	usersDB: new UsersDB(),
	placeholderApi: new PlaceholderApi(),
})

module.exports = dataSources