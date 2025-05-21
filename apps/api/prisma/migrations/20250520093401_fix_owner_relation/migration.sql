-- CreateTable
CREATE TABLE "UserOwners" (
    "userId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "UserOwners_pkey" PRIMARY KEY ("userId","ownerId")
);

-- AddForeignKey
ALTER TABLE "UserOwners" ADD CONSTRAINT "UserOwners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOwners" ADD CONSTRAINT "UserOwners_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
