/*
  Warnings:

  - You are about to drop the `UserOwners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOwners" DROP CONSTRAINT "UserOwners_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UserOwners" DROP CONSTRAINT "UserOwners_userId_fkey";

-- DropTable
DROP TABLE "UserOwners";
