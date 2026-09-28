CREATE TABLE `template_grant` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`granted` integer NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`granted_by` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `template_grant_user_idx` ON `template_grant` (`user_id`);