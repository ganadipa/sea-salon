CREATE TABLE IF NOT EXISTS "branches" (
	"name" varchar(50) PRIMARY KEY NOT NULL,
	"location" text,
	"startTime" integer NOT NULL,
	"endTime" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services_branches" (
	"service" varchar(50),
	"branch" varchar(50),
	CONSTRAINT "services_branches_service_branch_pk" PRIMARY KEY("service","branch")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services_branches" ADD CONSTRAINT "services_branches_branch_branches_name_fk" FOREIGN KEY ("branch") REFERENCES "public"."branches"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
