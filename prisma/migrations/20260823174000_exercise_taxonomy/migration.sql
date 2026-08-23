-- Replace the free-text Exercise.category with a proper enum, and add
-- defaultPrescription + coachingCue for the exercise-mode detail page.

CREATE TYPE "ExerciseCategory" AS ENUM (
    'speed_acceleration',
    'plyometric_elastic',
    'decel_cod',
    'core_antirotation',
    'contact_duel_strength',
    'robustness_resilience'
);

ALTER TABLE "Exercise" DROP COLUMN "category";
ALTER TABLE "Exercise"
    ADD COLUMN "category"            "ExerciseCategory" NOT NULL DEFAULT 'contact_duel_strength',
    ADD COLUMN "defaultPrescription" TEXT,
    ADD COLUMN "coachingCue"         TEXT;
