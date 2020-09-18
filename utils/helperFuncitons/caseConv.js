const toCamel = string => {
	return string.replace(/([-_][a-z])/ig, letter => (
		letter.toUpperCase()
		.replace('-', '')
		.replace('_', '')
	))
}

const snakeToCamel = object => {
	if (typeof object === 'object'
		&& object !== null
		&& !Array.isArray(object)
		&& !(object instanceof Date)
	) {
		const newObject = {}
		Object.keys(object).forEach(key => {
			newObject[toCamel(key)] = snakeToCamel(object[key])
		})

		return newObject
	} else if (Array.isArray(object)) {
		return object.map(item => snakeToCamel(item))
	} else if (typeof object === 'string') {
		return toCamel(object)
	}

	return object
}

const toSnake = string => {
	const firstLetter = string[0].toLowerCase()
	const restOfString = string.slice(1, string.length).replace(/([A-Z])/g, letter => (
		'_' + letter.toLowerCase()
	))

	return firstLetter + restOfString
}

const camelToSnake = object => {
	if (typeof object === 'object'
		&& object !== null
		&& !Array.isArray(object)
		&& !(object instanceof Date)
	) {
		const newObject = {}
		Object.keys(object).forEach(key => {
			newObject[toSnake(key)] = camelToSnake(object[key])
		})

		return newObject
	} else if (Array.isArray(object)) {
		return object.map(item => camelToSnake(item))
	} else if (typeof object === 'string') {
		return toSnake(object)
	}

	return object
}


module.exports.snakeToCamel = snakeToCamel
module.exports.camelToSnake = camelToSnake