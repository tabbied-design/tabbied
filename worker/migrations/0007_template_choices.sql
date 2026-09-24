-- The template downloads cap (30 distinct templates a month) becomes a choice:
-- each account makes five templates its own during the beta, and downloads and
-- customizes those without limit. `template_choice` holds the five,
-- `template_request` the one "Request more" message and an admin's grant.
--
-- The backfill makes every template a person already has theirs: anything they
-- downloaded or saved a site from. That can be more than five for an early
-- account, and it is meant to be: nothing taken is taken back, the count just
-- stops them choosing another. The admin reset column goes with the monthly
-- count it reset.
CREATE TABLE `template_choice` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `template_choice_user_slug_idx` ON `template_choice` (`user_id`,`slug`);--> statement-breakpoint
CREATE TABLE `template_request` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`note` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`granted` integer DEFAULT 0 NOT NULL,
	`decided_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `template_request_user_id_unique` ON `template_request` (`user_id`);--> statement-breakpoint
CREATE INDEX `template_request_status_created_idx` ON `template_request` (`status`,`created_at`);--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `downloads_reset_at`; --> statement-breakpoint
INSERT OR IGNORE INTO `template_choice` (`id`, `user_id`, `slug`, `created_at`)
SELECT lower(hex(randomblob(16))), `user_id`, `slug`, min(`created_at`)
FROM (
	SELECT `user_id`, `slug`, `created_at` FROM `download`
	UNION ALL
	SELECT `user_id`, `slug`, `created_at` FROM `site`
)
GROUP BY `user_id`, `slug`;
