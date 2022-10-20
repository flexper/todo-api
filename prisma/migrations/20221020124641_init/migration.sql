-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'FR');

-- CreateEnum
CREATE TYPE "TodoStatus" AS ENUM ('WIP', 'DONE');

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "discordUserId" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "username" TEXT,
    "email" TEXT,
    "lang" "Language" NOT NULL DEFAULT 'EN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" "TodoStatus" NOT NULL DEFAULT 'WIP',
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_id_key" ON "Token"("id");

-- CreateIndex
CREATE INDEX "Token_ownerId_idx" ON "Token"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordUserId_key" ON "User"("discordUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_key" ON "Todo"("id");

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
