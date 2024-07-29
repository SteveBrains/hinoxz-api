/*
  Warnings:

  - You are about to drop the column `population` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "population";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fetchedAddressId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_fetchedAddressId_fkey" FOREIGN KEY ("fetchedAddressId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
