"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/credit-cards", label: "Cards" },
  { href: "/bank-accounts", label: "Banks" },
  { href: "/resources", label: "Guides" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[var(--z-nav)] flex justify-center px-4 pt-6">
        <nav className="pointer-events-auto flex w-full max-w-max items-center gap-2 rounded-full bg-[#f7f1e6]/80 p-1.5 ring-1 ring-foreground/10 backdrop-blur-2xl md:gap-3">
          <Link
            href="/"
            className="font-serif rounded-full px-4 py-2 text-lg tracking-tight text-foreground"
          >
            Churnable
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => {
              const active =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm tracking-tight",
                    "transition-[color,background-color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/credit-cards"
            className="group hidden items-center gap-2 rounded-full bg-primary py-1.5 pr-1.5 pl-4 text-sm text-primary-foreground md:inline-flex"
          >
            Browse
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <span className="text-xs">↗</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="relative ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-foreground/[0.04] md:hidden"
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "translate-y-0 rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-foreground transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "translate-y-0 -rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[var(--z-overlay)] bg-[#1c1612]/85 backdrop-blur-3xl",
          "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex min-h-[100dvh] flex-col justify-end px-6 pb-16">
          {navLinks.map(({ href, label }, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              style={{
                transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms",
              }}
              className={cn(
                "font-serif border-b border-white/10 py-6 text-4xl tracking-tight text-[#f7f1e6]",
                "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0",
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
