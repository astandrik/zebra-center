--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET search_path = public, pg_catalog;

--
-- Data for Name: views; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO views (viewid, title, alias) VALUES (3, 'Подраздел', 'SubFirst');
INSERT INTO views (viewid, title, alias) VALUES (2, 'Второй раздел', 'Second');
INSERT INTO views (viewid, title, alias) VALUES (1, 'Первый раздел', 'First');


--
-- Name: views_viewid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('views_viewid_seq', 2, true);


--
-- PostgreSQL database dump complete
--

