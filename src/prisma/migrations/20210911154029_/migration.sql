/*
  Warnings:

  - You are about to drop the column `botId` on the `service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_botId_fkey";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "botId",
ADD COLUMN     "bot_id" INTEGER;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_bot_id_fkey" FOREIGN KEY ("bot_id") REFERENCES "bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
