"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/find-a-pro", label: "Find a Pro" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/states", label: "States" },
  { href: "/cities", label: "Cities" },
  { href: "/compare", label: "Compare" },
  { href: "/guides", label: "Guides" },
  { href: "/insights", label: "Insights" }
] as const;

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-surface text-brand-text backdrop-blur-md">
      <Container className="py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4 xl:gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-[0.85]"
            aria-label="RentX home"
          >
            <Image
              src="/logo-rentx.png"
              alt="RentX logo"
              width={48}
              height={48}
              priority
              className="h-9 w-9 rounded-xl sm:h-12 sm:w-12"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-brand-text sm:text-base">RentX</span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-2 text-sm lg:flex xl:gap-2.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[14px] font-semibold underline-offset-4 transition xl:px-3 ${
                  isActive(item.href)
                    ? "bg-brand-hover text-brand-text"
                    : "text-brand-muted hover:bg-brand-hover hover:text-brand-text hover:underline"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex min-h-10 min-w-12 items-center justify-center rounded-full border border-white/10 bg-[#C78B5E] px-5 py-2.5 text-sm font-semibold text-[#0E2A23] shadow-[0_6px_20px_rgba(199,139,94,0.25)] transition hover:bg-[#B8734C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C78B5E]/40"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="mt-3 flex items-center gap-2 sm:gap-3">
            <Link
              href="/about"
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isActive("/about")
                  ? "bg-brand-hover text-brand-text"
                  : "border border-brand-border text-brand-muted hover:bg-brand-hover hover:text-brand-text"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                isActive("/contact")
                  ? "bg-brand-hover text-brand-text"
                  : "border border-brand-border text-brand-muted hover:bg-brand-hover hover:text-brand-text"
              }`}
            >
              Contact Us
            </Link>
          </div>

          {mobileMenuOpen && (
            <nav id="mobile-nav" aria-label="Mobile primary" className="mt-3 space-y-1 rounded-3xl border border-brand-border bg-brand-surface p-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm ${
                    isActive(item.href)
                      ? "bg-brand-hover text-brand-text"
                      : "text-brand-muted hover:bg-brand-hover hover:text-brand-text"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}
