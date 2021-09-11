/*
  Warnings:

  - The values [FACEBOOK] on the enum `BotType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BotType_new" AS ENUM ('CHATWORK', 'SLACK');
ALTER TABLE "bot" ALTER COLUMN "type" TYPE "BotType_new" USING ("type"::text::"BotType_new");
ALTER TYPE "BotType" RENAME TO "BotType_old";
ALTER TYPE "BotType_new" RENAME TO "BotType";
DROP TYPE "BotType_old";
COMMIT;
