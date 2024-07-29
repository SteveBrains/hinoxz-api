-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_fetchedAddressId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "fetchedAddressId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_fetchedAddressId_fkey" FOREIGN KEY ("fetchedAddressId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
