CREATE TABLE IF NOT EXISTS "services" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"duration" integer NOT NULL,
	"description" text,
	"imageUrl" text
);
--> statement-breakpoint
ALTER TABLE "reservations" ALTER COLUMN "service" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "phoneNumber" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_service_services_name_fk" FOREIGN KEY ("service") REFERENCES "public"."services"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");