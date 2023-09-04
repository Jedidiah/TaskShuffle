/*
  Warnings:

  - You are about to drop the column `listItemTagId` on the `ListItem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ListItemToListItemTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ListItemToListItemTag_A_fkey" FOREIGN KEY ("A") REFERENCES "ListItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ListItemToListItemTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ListItemTag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ListItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "webhook" TEXT,
    CONSTRAINT "ListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListItem_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ListItem" ("createdAt", "description", "id", "listId", "title", "userId", "webhook") SELECT "createdAt", "description", "id", "listId", "title", "userId", "webhook" FROM "ListItem";
DROP TABLE "ListItem";
ALTER TABLE "new_ListItem" RENAME TO "ListItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ListItemToListItemTag_AB_unique" ON "_ListItemToListItemTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ListItemToListItemTag_B_index" ON "_ListItemToListItemTag"("B");
