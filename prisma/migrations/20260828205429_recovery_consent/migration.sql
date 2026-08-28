-- CreateTable
CREATE TABLE "RecoveryConsent" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "isUnder16" BOOLEAN NOT NULL,
    "sessionSlug" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecoveryConsent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RecoveryConsent_playerId_createdAt_idx" ON "RecoveryConsent"("playerId", "createdAt");

-- AddForeignKey
ALTER TABLE "RecoveryConsent" ADD CONSTRAINT "RecoveryConsent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
