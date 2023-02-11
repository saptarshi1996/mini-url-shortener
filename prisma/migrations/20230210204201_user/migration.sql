/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `first_name` VARCHAR(100) NOT NULL,
    ADD COLUMN `is_verified` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `last_name` VARCHAR(100) NULL,
    ADD COLUMN `password` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_email_key` ON `users`(`email`);
