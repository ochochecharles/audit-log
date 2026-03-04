/*
  Warnings:

  - You are about to drop the column `actorId` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `actorType` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_assignedToId_fkey";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "actorId",
DROP COLUMN "actorType",
ADD COLUMN     "location" TEXT,
ALTER COLUMN "entityId" DROP NOT NULL;

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "UserProfile";
