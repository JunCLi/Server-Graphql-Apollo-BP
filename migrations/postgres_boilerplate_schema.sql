--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: boilerplate; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA boilerplate;


ALTER SCHEMA boilerplate OWNER TO postgres;

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: boilerplate; Owner: postgres
--

CREATE FUNCTION boilerplate.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
			NEW.last_modified = NOW();
			RETURN NEW;
		END;
		$$;


ALTER FUNCTION boilerplate.trigger_set_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blacklist_jwt; Type: TABLE; Schema: boilerplate; Owner: postgres
--

CREATE TABLE boilerplate.blacklist_jwt (
    user_id character varying(255) NOT NULL,
    token text NOT NULL,
    date_added timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    token_issued bigint NOT NULL,
    token_expiration bigint NOT NULL
);


ALTER TABLE boilerplate.blacklist_jwt OWNER TO postgres;

--
-- Name: pgmigrations; Type: TABLE; Schema: boilerplate; Owner: postgres
--

CREATE TABLE boilerplate.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE boilerplate.pgmigrations OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: boilerplate; Owner: postgres
--

CREATE SEQUENCE boilerplate.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE boilerplate.pgmigrations_id_seq OWNER TO postgres;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: boilerplate; Owner: postgres
--

ALTER SEQUENCE boilerplate.pgmigrations_id_seq OWNED BY boilerplate.pgmigrations.id;


--
-- Name: users; Type: TABLE; Schema: boilerplate; Owner: postgres
--

CREATE TABLE boilerplate.users (
    id character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    date_created timestamp with time zone DEFAULT now() NOT NULL,
    last_modified timestamp with time zone DEFAULT now() NOT NULL,
    first_name character varying(128),
    last_name character varying(128)
);


ALTER TABLE boilerplate.users OWNER TO postgres;

--
-- Name: pgmigrations id; Type: DEFAULT; Schema: boilerplate; Owner: postgres
--

ALTER TABLE ONLY boilerplate.pgmigrations ALTER COLUMN id SET DEFAULT nextval('boilerplate.pgmigrations_id_seq'::regclass);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: boilerplate; Owner: postgres
--

ALTER TABLE ONLY boilerplate.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: boilerplate; Owner: postgres
--

ALTER TABLE ONLY boilerplate.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users set_timestamp; Type: TRIGGER; Schema: boilerplate; Owner: postgres
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON boilerplate.users FOR EACH ROW EXECUTE FUNCTION boilerplate.trigger_set_timestamp();


--
-- PostgreSQL database dump complete
--

