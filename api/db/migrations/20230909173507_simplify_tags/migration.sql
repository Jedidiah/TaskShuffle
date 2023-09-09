/*
  Warnings:

  - You are about to drop the `ListItemTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ListItemToListItemTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ListItemToListItemTag_B_index";

-- DropIndex
DROP INDEX "_ListItemToListItemTag_AB_unique";

-- AlterTable
ALTER TABLE "ListItem" ADD COLUMN "tags" TEXT DEFAULT '';

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ListItemTag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ListItemToListItemTag";
PRAGMA foreign_keys=on;

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
    "order" TEXT NOT NULL DEFAULT '',
    "theme" TEXT,
    "themeProperties" TEXT,
    "tags" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "List_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("createdAt", "description", "id", "isPrivate", "order", "skipLimit", "theme", "themeProperties", "title", "userId") SELECT "createdAt", "description", "id", "isPrivate", "order", "skipLimit", "theme", "themeProperties", "title", "userId" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
