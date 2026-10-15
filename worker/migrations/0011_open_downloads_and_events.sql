-- Templates are free to download without an account, so the download log
-- takes rows with no user (`user_id` nullable, still cascading with an
-- account that has one), and an index on `created_at` for the admin
-- overview's last 30 days. A first-party `event` table records the counts
-- the overview shows beside it (routes/events.ts).
--
-- Written by hand from drizzle's output, which switched foreign keys off
-- around the rebuild, which D1 does not allow. SQLite cannot change a
-- column's nullability, so `download` is rebuilt: create, copy, drop,
-- rename. Nothing references `download`, so dropping it cascades nowhere,
-- and the copy keeps every row the beta logged.
CREATE TABLE `__new_download` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`slug` text NOT NULL,
	`format` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_download` ("id", "user_id", "slug", "format", "created_at")
SELECT "id", "user_id", "slug", "format", "created_at" FROM `download`;--> statement-breakpoint
DROP TABLE `download`;--> statement-breakpoint
ALTER TABLE `__new_download` RENAME TO `download`;--> statement-breakpoint
CREATE INDEX `download_user_created_idx` ON `download` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `download_created_idx` ON `download` (`created_at`);--> statement-breakpoint
CREATE TABLE `event` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`slug` text,
	`user_id` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `event_kind_created_idx` ON `event` (`kind`,`created_at`);--> statement-breakpoint
CREATE INDEX `event_user_idx` ON `event` (`user_id`);
