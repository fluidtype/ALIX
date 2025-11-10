import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";

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
    <html lang="it" className="bg-carbon overflow-x-hidden">
      <body className="bg-carbon text-grey400 min-h-screen overflow-x-hidden">
        {children}
        <Toaster richColors position="top-center" closeButton />
      </body>
    </html>
  );
}
