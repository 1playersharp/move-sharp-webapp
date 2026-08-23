-- Global "am I at home or in a gym" preference on Player, feeding equipment
-- defaults and cue selection everywhere.

CREATE TYPE "TrainingContext" AS ENUM ('home', 'gym');

ALTER TABLE "Player"
    ADD COLUMN "trainingContext" "TrainingContext" NOT NULL DEFAULT 'home';
