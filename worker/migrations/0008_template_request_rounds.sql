-- "Request more" in two rounds. A person's first request answers three
-- questions and is granted by an emailed single-use link that adds 5; later
-- requests are reviewed by the team. A person now has a history of requests
-- rather than one, so the unique index on user_id goes, and the answers, the
-- link's hash and expiry, and the scheduled send time are new columns.
--
-- Written by hand from drizzle's output, which selected the new columns out
-- of the old table and switched foreign keys off, which D1 does not allow.
-- Nothing references template_request, so dropping it cascades nowhere.
-- The rows 0007 wrote were one reviewed message each, so they become round 2.
CREATE TABLE `__new_template_request` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`round` integer DEFAULT 1 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`granted` integer DEFAULT 0 NOT NULL,
	`role` text,
	`building` text,
	`sites` text,
	`need` text,
	`pay` text,
	`fair_price` text,
	`link` text,
	`note` text DEFAULT '' NOT NULL,
	`token_hash` text,
	`expires_at` integer,
	`send_at` integer,
	`decided_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_template_request` ("id", "user_id", "round", "status", "granted", "note", "decided_at", "created_at")
SELECT "id", "user_id", 2, "status", "granted", "note", "decided_at", "created_at" FROM `template_request`;--> statement-breakpoint
DROP TABLE `template_request`;--> statement-breakpoint
ALTER TABLE `__new_template_request` RENAME TO `template_request`;--> statement-breakpoint
CREATE INDEX `template_request_status_created_idx` ON `template_request` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `template_request_user_created_idx` ON `template_request` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `template_request_token_idx` ON `template_request` (`token_hash`);
