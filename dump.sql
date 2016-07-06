--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.3
-- Dumped by pg_dump version 9.5.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: DRAFTS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "DRAFTS" (
    "ID" integer NOT NULL,
    "KEYWORDS" text,
    "TITLE" text,
    "DESCRIPTION" text,
    "ALIAS" text,
    "HEADER" text,
    "TEXT" text,
    "ANNOTATION" text,
    "VIEWID" numeric
);


ALTER TABLE "DRAFTS" OWNER TO postgres;

--
-- Name: DRAFTS_ID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "DRAFTS_ID_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "DRAFTS_ID_seq" OWNER TO postgres;

--
-- Name: DRAFTS_ID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "DRAFTS_ID_seq" OWNED BY "DRAFTS"."ID";


--
-- Name: ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "DRAFTS" ALTER COLUMN "ID" SET DEFAULT nextval('"DRAFTS_ID_seq"'::regclass);


--
-- Data for Name: DRAFTS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY "DRAFTS" ("ID", "KEYWORDS", "TITLE", "DESCRIPTION", "ALIAS", "HEADER", "TEXT", "ANNOTATION", "VIEWID") FROM stdin;
\.


--
-- Name: DRAFTS_ID_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"DRAFTS_ID_seq"', 3, true);


--
-- Name: ALIASUNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "DRAFTS"
    ADD CONSTRAINT "ALIASUNIQUE" UNIQUE ("ALIAS");


--
-- Name: ID_DRAFTS; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "DRAFTS"
    ADD CONSTRAINT "ID_DRAFTS" PRIMARY KEY ("ID");


--
-- PostgreSQL database dump complete
--

