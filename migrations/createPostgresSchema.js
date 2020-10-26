const databaseSchema = 'boilerplate'

exports.up = pgm => {
	// Functions
	pgm.sql(`
		CREATE OR REPLACE FUNCTION trigger_set_timestamp()
		RETURNS TRIGGER AS $$
		BEGIN
			NEW.last_modified = NOW();
			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
	`)

	// Tables
  pgm.sql(`
    CREATE TABLE "${databaseSchema}"."users" (
      "id" VARCHAR(255) PRIMARY KEY,
      "email" VARCHAR(255) NOT NULL,
      "password" VARCHAR(255) NOT NULL,
			"date_created" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"last_modified" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"first_name" VARCHAR(128),
			"last_name" VARCHAR(128)
    );
	`)

	pgm.sql(`
		CREATE TABLE "${databaseSchema}"."blacklist_jwt" (
			"user_id" VARCHAR(255) NOT NULL,
			"token" TEXT NOT NULL,
			"date_added" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			"token_issued" BIGINT NOT NULL,
			"token_expiration" BIGINT NOT NULL
		);
	`)

	// Triggers
	pgm.sql(`
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON ${databaseSchema}.users
		FOR EACH ROW
		EXECUTE PROCEDURE trigger_set_timestamp();
	`)
}