/*
  Warnings:

  - You are about to drop the `_UserOwners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserOwners" DROP CONSTRAINT "_UserOwners_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserOwners" DROP CONSTRAINT "_UserOwners_B_fkey";

-- DropTable
DROP TABLE "_UserOwners";

-- CreateTable
CREATE TABLE "UserOwner" (
    "userId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserOwner_pkey" PRIMARY KEY ("userId","ownerId")
);

-- AddForeignKey
ALTER TABLE "UserOwner" ADD CONSTRAINT "UserOwner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOwner" ADD CONSTRAINT "UserOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
