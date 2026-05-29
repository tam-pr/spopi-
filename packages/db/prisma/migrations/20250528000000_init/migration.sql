-- CreateTable
CREATE TABLE "UploadSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'CREATED',

    CONSTRAINT "UploadSession_pkey" PRIMARY KEY ("id")
);
