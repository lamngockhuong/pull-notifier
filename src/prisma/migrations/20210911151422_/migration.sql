-- CreateEnum
CREATE TYPE "BotType" AS ENUM ('CHATWORK', 'SLACK');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('GITHUB', 'GITLAB');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chatwork_id" TEXT NOT NULL,
    "github_id" TEXT NOT NULL,
    "slack_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bot" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "type" "BotType" NOT NULL,

    CONSTRAINT "bot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "service_key" TEXT NOT NULL,
    "secret_token" TEXT NOT NULL,
    "type" "ServiceType" NOT NULL,
    "room_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "botId" INTEGER,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "service_service_key_key" ON "service"("service_key");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_botId_fkey" FOREIGN KEY ("botId") REFERENCES "bot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
