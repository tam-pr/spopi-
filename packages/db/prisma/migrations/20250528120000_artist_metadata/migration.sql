-- CreateTable
CREATE TABLE "ArtistMetadata" (
    "id" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "spotifyArtistId" TEXT,
    "genres" TEXT[],
    "imageUrl" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArtistMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArtistMetadata_artistName_key" ON "ArtistMetadata"("artistName");
