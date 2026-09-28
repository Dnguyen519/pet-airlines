-- Lead-source attribution columns. Purely additive: every column is
-- nullable, none carry a default that would rewrite existing rows, and
-- nothing here touches an existing column. Safe to apply to production
-- ahead of the code that populates these fields — until that code ships,
-- every row (old and new) simply has NULLs in these columns.
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_self_reported" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_self_detail" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_channel" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_detail_auto" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_referrer_host" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_referrer_path" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_landing_path" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "utm_source" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "utm_medium" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "utm_campaign" text;
--> statement-breakpoint
ALTER TABLE "inquiries" ADD COLUMN IF NOT EXISTS "source_first_seen_at" timestamptz;
