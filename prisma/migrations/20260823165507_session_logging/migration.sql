-- Phase 7 additions to SessionTemplate + Exercise + Session.

-- AlterTable: SessionTemplate — add week/day/focus/cues.
ALTER TABLE "SessionTemplate"
    ADD COLUMN "week"    INTEGER,
    ADD COLUMN "day"     INTEGER,
    ADD COLUMN "focus"   TEXT,
    ADD COLUMN "gymCue"  TEXT,
    ADD COLUMN "homeCue" TEXT;

-- CreateIndex: one materialised session per (programme, week, day).
CREATE UNIQUE INDEX "SessionTemplate_programmeId_week_day_key"
    ON "SessionTemplate" ("programmeId", "week", "day");

-- AlterTable: Exercise — category + equipment.
ALTER TABLE "Exercise"
    ADD COLUMN "category"      TEXT NOT NULL DEFAULT 'general',
    ADD COLUMN "equipmentGym"  TEXT,
    ADD COLUMN "equipmentHome" TEXT;

-- AlterTable: Session — lightweight per-session exercise ticks.
ALTER TABLE "Session"
    ADD COLUMN "completedItemIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
