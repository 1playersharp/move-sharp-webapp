-- Per-exercise training contexts. Split movements list one context,
-- shared bodyweight/dual-use movements list both.

ALTER TABLE "Exercise"
    ADD COLUMN "contexts" "TrainingContext"[] NOT NULL DEFAULT ARRAY['home', 'gym']::"TrainingContext"[];
