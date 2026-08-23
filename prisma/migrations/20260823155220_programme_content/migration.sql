/*
  Warnings:

  - Added the required column `updatedAt` to the `Programme` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Quality" AS ENUM ('speed', 'power', 'strength', 'agility', 'endurance', 'robustness');

-- AlterTable
ALTER TABLE "Programme" ADD COLUMN     "curriculum" JSONB,
ADD COLUMN     "equipmentGym" TEXT,
ADD COLUMN     "equipmentHome" TEXT,
ADD COLUMN     "intent" TEXT,
ADD COLUMN     "qualities" "Quality"[] DEFAULT ARRAY[]::"Quality"[],
ADD COLUMN     "sessionsPerWeek" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
