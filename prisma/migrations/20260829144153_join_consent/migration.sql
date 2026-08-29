-- CreateTable
CREATE TABLE "JoinConsent" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "isUnder16" BOOLEAN NOT NULL,
    "parentAck" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JoinConsent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "JoinConsent_playerId_createdAt_idx" ON "JoinConsent"("playerId", "createdAt");

-- CreateIndex
CREATE INDEX "JoinConsent_teamId_createdAt_idx" ON "JoinConsent"("teamId", "createdAt");

-- AddForeignKey
ALTER TABLE "JoinConsent" ADD CONSTRAINT "JoinConsent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JoinConsent" ADD CONSTRAINT "JoinConsent_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
