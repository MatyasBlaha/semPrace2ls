/*
  Warnings:

  - The values [OFFICCE] on the enum `BranchType` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `BranchId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `OwnerId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BranchType_new" AS ENUM ('OFFICE', 'MARKET', 'WAREHOUSE');
ALTER TABLE "Branch" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Branch" ALTER COLUMN "type" TYPE "BranchType_new" USING ("type"::text::"BranchType_new");
ALTER TYPE "BranchType" RENAME TO "BranchType_old";
ALTER TYPE "BranchType_new" RENAME TO "BranchType";
DROP TYPE "BranchType_old";
ALTER TABLE "Branch" ALTER COLUMN "type" SET DEFAULT 'MARKET';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('SUPERADMIN', 'ACCOUNTANT', 'MANAGER', 'USER', 'HR');
ALTER TABLE "UserRole" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "UserRole" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "UserRole" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_BranchId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_OwnerId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_UserId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_UserId_fkey";

-- DropIndex
DROP INDEX "UserRole_UserId_key";

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "BranchId",
DROP COLUMN "OwnerId",
DROP COLUMN "UserId",
ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "deletedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userId_key" ON "Employee"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_key" ON "UserRole"("userId");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
