-- Add 'pre_match' to the FuelTag enum. 'school_gap' is retired from
-- app code but left in the enum to avoid a fragile array-cast rebuild;
-- no code path writes it any more.

ALTER TYPE "FuelTag" ADD VALUE IF NOT EXISTS 'pre_match';
