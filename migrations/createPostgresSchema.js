exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
    CREATE TABLE "boilerplate"."users" (
      "id" SERIAL PRIMARY KEY,
      "email" VARCHAR(255) NOT NULL,
      "password" VARCHAR(255) NOT NULL,
			"user_date_created" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_DATE,
			"last_modified" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			"first_name" VARCHAR(128),
			"last_name" VARCHAR(128)
    );
	`)
};