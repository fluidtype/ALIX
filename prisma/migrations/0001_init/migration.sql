-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_email_key" ON "subscription"("email");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_wallet_address_key" ON "subscription"("wallet_address");

