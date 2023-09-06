/*
  Warnings:

  - You are about to drop the column `url` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `webhook` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN "url" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "skipLimit" INTEGER DEFAULT 0,
    "theme" TEXT,
    "themeProperties" TEXT,
    CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("createdAt", "description", "id", "isPrivate", "skipLimit", "title", "userId") SELECT "createdAt", "description", "id", "isPrivate", "skipLimit", "title", "userId" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
