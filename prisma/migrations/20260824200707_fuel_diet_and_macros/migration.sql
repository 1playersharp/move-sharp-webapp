-- CreateEnum
CREATE TYPE "DietPreference" AS ENUM ('omnivore', 'pescatarian', 'vegetarian', 'vegan');

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "dietPreference" "DietPreference" NOT NULL DEFAULT 'omnivore';

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "carbsG" INTEGER,
ADD COLUMN     "dietSuitability" "DietPreference"[] DEFAULT ARRAY[]::"DietPreference"[],
ADD COLUMN     "proteinG" INTEGER;
