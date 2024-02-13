/*
  Warnings:

  - You are about to drop the column `type_document` on the `User` table. All the data in the column will be lost.
  - Added the required column `type_client` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeClient" AS ENUM ('COMMON', 'MERCHANT');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('WITHDRAW', 'DEPOSIT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type_document",
ADD COLUMN     "type_client" "TypeClient" NOT NULL;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "amount" MONEY NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
