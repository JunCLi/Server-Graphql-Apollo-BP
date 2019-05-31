const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 12
const crypto = require('crypto')
const Promise = require('bluebird')
const authenticate = require('../authenticate')

module.exports = {
  Mutation: {
		async placeholder(parent, {input}, {req, app, postgres}){
			try {

				return null
			} catch(err) {
				
			}
		},
  },
}



