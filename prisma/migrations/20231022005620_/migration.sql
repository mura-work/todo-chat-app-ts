/*
  Warnings:

  - You are about to drop the column `completed_date` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `responsible_username` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `completedDate` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "completedDate" DATETIME NOT NULL,
    "responsibleUserName" TEXT
);
INSERT INTO "new_Todo" ("content", "createdAt", "id", "title", "updatedAt") SELECT "content", "createdAt", "id", "title", "updatedAt" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
