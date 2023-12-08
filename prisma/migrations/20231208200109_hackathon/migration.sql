-- CreateTable
CREATE TABLE "Hackathon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "from" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATETIME,
    "end_date" DATETIME,
    "location" TEXT,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "registration_start_date" DATETIME NOT NULL,
    "registration_end_date" DATETIME NOT NULL,
    "team_size" INTEGER,
    "team_min" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
