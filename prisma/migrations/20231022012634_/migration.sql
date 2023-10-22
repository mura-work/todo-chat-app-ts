-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Todo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "completedDate" DATETIME NOT NULL,
    "responsibleUserName" TEXT,
    "isDone" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Todo" ("completedDate", "content", "createdAt", "id", "responsibleUserName", "title", "updatedAt") SELECT "completedDate", "content", "createdAt", "id", "responsibleUserName", "title", "updatedAt" FROM "Todo";
DROP TABLE "Todo";
ALTER TABLE "new_Todo" RENAME TO "Todo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
