import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spopi",
  description: "Spotify Wrapped from your data export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
