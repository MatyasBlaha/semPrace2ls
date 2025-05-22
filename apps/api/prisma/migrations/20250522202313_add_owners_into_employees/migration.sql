/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_ownerId_key" ON "Employee"("ownerId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
