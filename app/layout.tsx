import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALIXINDEX100 — Possiedi l’intelligenza",
  description:
    "ALIX è il token che ti apre l’accesso all’ALIXINDEX100, l’indice dei migliori 100 agenti di Virtuals Protocol.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-carbon text-grey400 min-h-screen">{children}</body>
    </html>
  );
}
