"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Indice", href: "/#index" },
  { label: "Come funziona", href: "/#how-it-works" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Whitepaper", href: "/whitepaper" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-steel/60 transition-all duration-300 ${
        scrolled ? "bg-carbon/90 shadow-[0_10px_30px_rgba(173,255,0,0.12)]" : "bg-black/40"
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between px-6 py-4 md:px-10 xl:px-16 2xl:px-24">
        <Link
          href="/#home"
          className="font-display text-2xl font-semibold text-neon tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          ALIX
        </Link>
        <nav className="hidden items-center gap-10 text-sm font-medium uppercase tracking-[0.18em] text-grey400 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative transition-colors duration-200 hover:text-neon"
            >
              <span className="after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-neon after:transition-transform after:duration-200 after:content-[''] hover:after:scale-x-100">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-steel/60 bg-black/40 p-2 text-grey400 transition-colors duration-200 hover:text-neon lg:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M10 18h10" />
          </svg>
        </button>
        <a
          href="https://www.alixindex.com"
          className="rounded-lg bg-neon px-5 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-carbon shadow-lime transition-all duration-200 hover:bg-lime-gradient"
        >
          Partecipa alla Prevendita
        </a>
      </div>
      {menuOpen && (
        <div className="lg:hidden">
          <nav className="mx-4 mt-2 space-y-2 rounded-2xl border border-steel/70 bg-black/80 px-6 py-6 backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-steel/40 pb-3 text-sm uppercase tracking-[0.25em] text-grey400 transition-colors duration-200 last:border-b-0 last:pb-0 hover:text-neon"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.alixindex.com"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-neon px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-carbon shadow-lime"
            >
              Prevendita
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
