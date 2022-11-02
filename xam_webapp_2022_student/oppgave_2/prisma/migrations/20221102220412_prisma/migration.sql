-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Student" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "group" TEXT
);
INSERT INTO "new_Student" ("age", "gender", "group", "id", "name") SELECT "age", "gender", "group", "id", "name" FROM "Student";
DROP TABLE "Student";
ALTER TABLE "new_Student" RENAME TO "Student";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
