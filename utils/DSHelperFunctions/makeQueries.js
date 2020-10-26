const { camelToSnake, snakeToCamel } = require('../helperFuncitons/caseConv')

const createWhereCondition = (selectors, joinType) => {
	return Object.keys(selectors).map((selector, index) => {
		const column = camelToSnake(selector)
		let joinType = index === 0 ? '' : 'AND '
		let condition = '='
		let value = selectors[selector]

		if (typeof value === 'object'
			&& value !== null
			&& !Array.isArray(value)
			&& !(value instanceof Date)
		) {
			joinType = index === 0 ? '' : value.joinType + ' '
			condition = value.condition
			value = value.value
		}
		return `${joinType}${column} ${condition} '${value}'`
	}).join(' ')
}

module.exports.createSelectQuery = (selectColumns, table, selector, selectorValue) => {
	selectColumns = selectColumns.map(column => camelToSnake(column))
  const queryString = selectColumns.join(', ')
	
	const snakeSelector = camelToSnake(selector)

  if (selector) {
    return {
      text: `SELECT ${queryString} FROM ${table} WHERE ${snakeSelector} = '${selectorValue}'`
    }
  } else {
    return {
      text: `SELECT ${queryString} FROM ${table}`
    }
  }
}

module.exports.createMultiSelectQuery = (selectColumns, table, selectors, joinType) => {
	selectColumns = selectColumns.map(column => camelToSnake(column))
	const queryString = selectColumns.join(', ')

	const whereConditionArray = selectors.map(selector => {
		const column = camelToSnake(selector.selector)
		const condition = selector.condition ? selector.condition : '='
		const value = selector.value
		return `${column} ${condition} '${value}'`
	})
	const joinCondition = joinType == 'or' ? ' OR ' : ' AND '
	const whereConditionString = whereConditionArray.join(joinCondition)

	if (selectors.length) {
		return {
			text: `SELECT ${queryString} FROM ${table} WHERE ${whereConditionString}`
		}
	} else {
		return {
			text: `SELECT ${queryString} FROM ${table}`
		}
	}
}


module.exports.createOffsetSelectQuery = (selectColumns, table, selector, selectorValue, limit, offset) => {
	selectColumns = selectColumns.map(column => camelToSnake(column))
	const queryString = selectColumns.join(', ')

  if (selector) {
    return {
      text: `SELECT ${queryString} FROM ${table} WHERE ${selector} = '${selectorValue}' LIMIT ${limit} OFFSET ${offset}`
    }
  } else {
    return {
      text: `SELECT ${queryString} FROM ${table} LIMIT ${limit} OFFSET ${offset}`
    }
  }
}

module.exports.createInsertQuery = (inputObject, table, returnValues) => {
	const queryKeys = Object.keys(inputObject)
  const queryValues = Object.values(inputObject)
	const convertedQueryKeys = queryKeys.map(key => camelToSnake(key))
  const queryString = convertedQueryKeys.join(', ')
  const queryValuesString = queryKeys.map(
    (key, index) => `$${index + 1}`
  ).join(', ')

  if(returnValues) {
    const returnString = Array.isArray(returnValues)
			? returnValues.map(returnVal => camelToSnake(returnVal)).join(', ')
			: returnValues
    return {
      text: `INSERT INTO ${table} (${queryString}) VALUES (${queryValuesString}) RETURNING ${returnString}`,
      values: queryValues
    }
  } else {
    return {
      text: `INSERT INTO ${table} (${queryString}) VALUES (${queryValuesString})`,
      values: queryValues
    }
  }
}

module.exports.createUpdateQuery = (inputObject, table, selectors, returnVal) => {  
  const queryKeys = Object.keys(inputObject).filter(key => (
		Object.keys(selectors).filter(selector => (
			inputObject[key] !== null && key !== selector
		))
	))

  const queryValues = queryKeys.map(key => inputObject[key])
  const queryString = queryKeys.map((key, index) => {
    return `${key} = $${index + 1}`
	}).join(', ')
	const whereConditionString = createWhereCondition(selectors)

  if (returnVal) {
    return {
      text: `UPDATE ${table} SET ${queryString} WHERE ${whereConditionString} RETURNING ${returnVal}`,
      values: queryValues
    }
  } else {
    return {
      text: `UPDATE ${table} SET ${queryString} WHERE ${whereConditionString} RETURNING id`,
      values: queryValues
    }
  }
}

module.exports.createDeleteQuery = (table, selector, selectorValue) => {
	return {
		text: `DELETE FROM ${table} WHERE ${selector} = ${selectorValue}`
	}
}