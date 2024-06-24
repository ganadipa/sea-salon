CREATE TABLE IF NOT EXISTS "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"description" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
