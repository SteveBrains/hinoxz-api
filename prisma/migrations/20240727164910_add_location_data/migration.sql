/*
  Warnings:

  - You are about to drop the column `name` on the `Location` table. All the data in the column will be lost.
  - Added the required column `area` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `population` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "name",
ADD COLUMN     "area" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "district" TEXT NOT NULL,
ADD COLUMN     "population" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
