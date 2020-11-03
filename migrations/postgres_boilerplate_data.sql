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
-- Data for Name: blacklist_jwt; Type: TABLE DATA; Schema: boilerplate; Owner: postgres
--

COPY boilerplate.blacklist_jwt (user_id, token, date_added, token_issued, token_expiration) FROM stdin;
\.


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: boilerplate; Owner: postgres
--

COPY boilerplate.pgmigrations (id, name, run_on) FROM stdin;
1	createPostgresSchema	2020-11-03 18:46:31.606556
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: boilerplate; Owner: postgres
--

COPY boilerplate.users (id, email, password, date_created, last_modified, first_name, last_name) FROM stdin;
oEYInOxNe3MryevgGUYeM8DC	LinusSebastion@LTTStore.com	$2b$12$fNnGo60D/19iB6U0yKg8H.jzp.vlKR3oAQNUVJsX3uKz9qeihZSyC	2020-11-03 18:46:32.086986-05	2020-11-03 18:46:32.086986-05	Linus	 Sebastion
sfmpHQic9II9o35xcFiF5Lyl	JamesStrieb@LTTStore.com	$2b$12$rglqSuxQbiGZJJy/DtKwbuDsEv55RzpcTw2iDmd9ccy8vIrukCCrK	2020-11-03 18:46:32.086986-05	2020-11-03 18:46:32.086986-05	James	Strieb
2XdfHBF0dTa0WEPsCc5nnlh2	RileyMurdock@LTTStore.com	$2b$12$m2LQjNXYwnTZKXfql66Nb.H4OUheGewIaUc9E/z5mWsxbeBKphnja	2020-11-03 18:46:32.086986-05	2020-11-03 18:46:32.086986-05	Riley	Murdock
EzxaYt8R0x3fKnHlVPopDU6A	AlexClark@LTTStore.com	$2b$12$g6E5here.8d2AKSFA/8xPeDW4ZajdKDvVJ.QJklm9wZ6IE8U9OVom	2020-11-03 18:46:32.086986-05	2020-11-03 18:46:32.086986-05	Alex	Clark
\.


--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: boilerplate; Owner: postgres
--

SELECT pg_catalog.setval('boilerplate.pgmigrations_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

