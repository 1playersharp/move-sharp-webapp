-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_createdByUserId_fkey";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
