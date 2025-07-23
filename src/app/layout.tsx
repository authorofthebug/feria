import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Feria - Marketplace",
  description: "Descubre productos increíbles o vende lo que ya no necesitas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
