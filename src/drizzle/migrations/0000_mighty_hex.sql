DO $$ BEGIN
 CREATE TYPE "public"."service" AS ENUM('Haircuts and Styling', 'Manicure and Pedicure', 'Facial Treatments');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"phonenumber" varchar(15) NOT NULL,
	"service" "service" NOT NULL,
	"datetime" timestamp(6) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"description" varchar(100) NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp(6) with time zone DEFAULT now() NOT NULL
);
