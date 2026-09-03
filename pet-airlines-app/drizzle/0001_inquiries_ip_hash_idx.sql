CREATE INDEX IF NOT EXISTS "inquiries_ip_hash_created_at_idx" ON "inquiries" ("ip_hash", "created_at" DESC);
