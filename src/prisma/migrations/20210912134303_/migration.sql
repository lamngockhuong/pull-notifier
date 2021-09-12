-- CreateTable
CREATE TABLE "webhook" (
    "id" SERIAL NOT NULL,
    "service_key" TEXT NOT NULL,
    "secret_token" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "bot" JSONB,
    "room" JSONB NOT NULL,
    "setting" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webhook_service_key_key" ON "webhook"("service_key");
