CREATE TABLE `download` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`slug` text NOT NULL,
	`format` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `download_user_created_idx` ON `download` (`user_id`,`created_at`);--> statement-breakpoint
ALTER TABLE `user` ADD `downloads_reset_at` integer;