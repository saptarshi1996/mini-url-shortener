-- AlterTable
ALTER TABLE `user_verifications` ALTER COLUMN `created_at` DROP DEFAULT;

-- CreateIndex
CREATE INDEX `user_verifications_user_id_idx` ON `user_verifications`(`user_id`);
