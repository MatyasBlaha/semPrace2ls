/*
  Warnings:

  - You are about to drop the `UserOwner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOwner" DROP CONSTRAINT "UserOwner_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "UserOwner" DROP CONSTRAINT "UserOwner_userId_fkey";

-- DropTable
DROP TABLE "UserOwner";

-- CreateTable
CREATE TABLE "_UserOwners" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserOwners_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserOwners_B_index" ON "_UserOwners"("B");

-- AddForeignKey
ALTER TABLE "_UserOwners" ADD CONSTRAINT "_UserOwners_A_fkey" FOREIGN KEY ("A") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOwners" ADD CONSTRAINT "_UserOwners_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
