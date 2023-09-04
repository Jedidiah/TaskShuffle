/*
  Warnings:

  - Made the column `title` on table `List` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "webhook" TEXT,
    "url" TEXT,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "skipLimit" INTEGER DEFAULT 0,
    CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("createdAt", "description", "id", "isPrivate", "skipLimit", "title", "url", "userId", "webhook") SELECT "createdAt", "description", "id", "isPrivate", "skipLimit", "title", "url", "userId", "webhook" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
