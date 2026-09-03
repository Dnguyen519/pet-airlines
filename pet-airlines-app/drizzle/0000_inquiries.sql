CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inquiry_number" text NOT NULL UNIQUE,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"pet_type" text NOT NULL,
	"pet_breed" text,
	"pet_weight_kg" numeric(6, 2),
	"pet_count" integer NOT NULL DEFAULT 1,
	"from_country" char(2) NOT NULL,
	"from_city" text NOT NULL,
	"to_country" char(2) NOT NULL,
	"to_city" text NOT NULL,
	"travel_date" date,
	"special_requests" text,
	"status" text NOT NULL DEFAULT 'new',
	"customer_email_sent" boolean NOT NULL DEFAULT false,
	"admin_email_sent" boolean NOT NULL DEFAULT false,
	"ip_hash" text,
	"user_agent" text,
	"created_at" timestamptz NOT NULL DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "inquiries_created_at_idx" ON "inquiries" ("created_at" DESC);
