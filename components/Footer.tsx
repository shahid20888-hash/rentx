"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

function SocialIcon({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="h-10 w-10 shrink-0 inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand-border bg-brand-surface text-brand-text transition-all duration-200 ease-out hover:bg-brand-hover"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-surface pt-10 pb-8 text-sm text-brand-text">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-3 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-rentx.png"
                alt="RentX logo"
                width={42}
                height={42}
                className="rounded-lg"
              />
              <span className="font-semibold text-brand-text">RentX</span>
            </div>
            <p className="text-sm text-brand-muted">
              RentX is an independent U.S. cost-of-living resource with practical comparisons, guides, and planning tools.
            </p>
            <p className="text-xs text-brand-muted">
              Contact: <a className="underline hover:text-brand-text" href="mailto:support@rentx.us">support@rentx.us</a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-text">Services</h2>
            <ul className="space-y-1.5">
              <li><Link href={"/compare/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Compare Costs</Link></li>
              <li><Link href={"/states/" as any} className="text-brand-muted hover:text-brand-text hover:underline">State Explorer</Link></li>
              <li><Link href={"/cities/" as any} className="text-brand-muted hover:text-brand-text hover:underline">City Explorer</Link></li>
              <li><Link href={"/guides/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Moving Guides</Link></li>
              <li><Link href={"/find-a-pro/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Find a Pro</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-text">Legal Pages</h2>
            <ul className="space-y-1.5">
              <li><Link href={"/privacy-policy/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Privacy Policy</Link></li>
              <li><Link href={"/terms/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Terms &amp; Conditions</Link></li>
              <li><Link href={"/disclaimer/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Disclaimer</Link></li>
              <li><Link href={"/editorial-policy/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Editorial Policy</Link></li>
              <li><Link href={"/cookie-policy/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Cookie Policy</Link></li>
              <li><Link href={"/dmca/" as any} className="text-brand-muted hover:text-brand-text hover:underline">DMCA</Link></li>
              <li><Link href={"/advertising-disclosure/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Advertising Disclosure</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-text">Company Info</h2>
            <ul className="space-y-1.5">
              <li><Link href={"/about/" as any} className="text-brand-muted hover:text-brand-text hover:underline">About Us</Link></li>
              <li><Link href={"/contact/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Contact Us</Link></li>
              <li><Link href={"/insights/" as any} className="text-brand-muted hover:text-brand-text hover:underline">Latest Insights</Link></li>
            </ul>
            <div className="flex items-center gap-3 pt-1">
              <SocialIcon href="https://www.facebook.com/profile.php?id=61586119617473" label="RentX Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M14 8h2V5h-2c-2.2 0-4 1.8-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9c0-.6.4-1 1-1z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/rentx-us/" label="RentX LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M6.9 8.5H3.8V20h3.1V8.5zM5.3 3A1.8 1.8 0 1 0 5.3 6.6 1.8 1.8 0 0 0 5.3 3zM20.2 13.2c0-3.1-1.7-4.9-4.4-4.9-2 0-2.9 1.1-3.4 1.9v-1.7H9.3V20h3.1v-6c0-1.6.3-3.1 2.2-3.1s1.9 1.8 1.9 3.2v5.9h3.1v-6.8z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://rentx.us" label="RentX">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M18.2 3H21l-6.5 7.4L22 21h-6l-4.7-6.1L6 21H3l6.9-7.9L2 3h6.1l4.3 5.6L18.2 3zM17 19h1.7L7 5H5.2L17 19z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-brand-border pt-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-brand-muted">&copy; {currentYear} RentX. All rights reserved.</p>
            <p className="text-xs text-brand-muted">
              Independent informational content. Learn more in our{" "}
              <Link href={"/editorial-policy/" as any} className="underline hover:text-brand-text">Editorial Policy</Link>.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
