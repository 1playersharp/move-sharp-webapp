-- CreateTable
CREATE TABLE "ReadinessEntry" (
    "id" UUID NOT NULL,
    "playerId" UUID NOT NULL,
    "recordedOn" DATE NOT NULL,
    "soreness" INTEGER NOT NULL,
    "sleep" INTEGER NOT NULL,
    "energy" INTEGER NOT NULL,
    "mood" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReadinessEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReadinessEntry_playerId_recordedOn_idx" ON "ReadinessEntry"("playerId", "recordedOn");

-- CreateIndex
CREATE UNIQUE INDEX "ReadinessEntry_playerId_recordedOn_key" ON "ReadinessEntry"("playerId", "recordedOn");

-- AddForeignKey
ALTER TABLE "ReadinessEntry" ADD CONSTRAINT "ReadinessEntry_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
