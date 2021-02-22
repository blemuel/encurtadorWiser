CREATE TABLE urls
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    url character varying(150) COLLATE pg_catalog."default" NOT NULL,
    newurl character varying(100) COLLATE pg_catalog."default" NOT NULL,
    expiresat timestamp with time zone NOT NULL
)