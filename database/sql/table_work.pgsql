CREATE TABLE IF NOT EXISTS "work" (
    "id" serial,
    "creator" integer,
    "name" text,
    "status" text,
    "result" real,
    "workLink" text,
    "documentLink" text,
    "created" bigint,
    "deadline" bigint
);

