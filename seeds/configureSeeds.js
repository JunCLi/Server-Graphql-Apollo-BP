const { Pool } = require('pg')
const squel = require('squel').useFlavour('postgres')
const config = require('../config/development.json')

const userSeeds = require('./userSeeds')

const databaseSchema = 'boilerplate'

const allSeeds = [
	userSeeds,
]

const seedTable = async (pg, seedsArray, table) => (
	seedsArray.map(async seed => 
		pg.query(
			squel
				.insert()
				.into(`${databaseSchema}.${table}`)
				.setFields(seed)
				.toParam()
		)
	)
)

const createSeed = async (pg, seedsArray) => (
	seedsArray.map(async (seedBundle, index) => (
		Array.isArray(seedBundle)
			? createSeed(pg, seedBundle)
			: seedTable(pg, seedBundle.seeds, seedBundle.table)
	))
)

const seed = async () => {
  const pg = await new Pool(config.db).connect()

  try {
    await pg.query('BEGIN')
    console.log('Seeding tables...')

		await Promise.all(await createSeed(pg, allSeeds))

    await pg.query('COMMIT')
  } catch (e) {
    await pg.query('ROLLBACK')
    throw e
  } finally {
    pg.release()
  }
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
