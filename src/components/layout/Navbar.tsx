"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import {
  CreditCard,
  Bank,
  BookOpen,
  List,
  X,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/credit-cards",
    label: "Credit Cards",
    description: "Compare welcome bonuses, rewards, and annual fees",
    icon: CreditCard,
  },
  {
    href: "/bank-accounts",
    label: "Bank Accounts",
    description: "Checking, savings, and high-yield deposit promos",
    icon: Bank,
  },
  {
    href: "/resources",
    label: "Guides",
    description: "Playbooks, Chase 5/24 rules, and churning FAQs",
    icon: BookOpen,
  },
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
      <header className="sticky top-0 z-[var(--z-nav)] w-full border-b border-slate-200/80 bg-white/95 shadow-xs backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <BrandLogo size="md" href="/" />

            {/* Desktop Navigation Links */}
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Main Navigation"
            >
              {navItems.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(`${href}/`));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-slate-100 text-[#0160c4] dark:bg-slate-900 dark:text-[#38b6ff]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Primary CTA */}
            <Link
              href="/credit-cards"
              className="hidden items-center gap-1.5 rounded-lg bg-[#0160c4] px-4 py-2 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98] sm:inline-flex"
            >
              <span>Compare Offers</span>
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              {isOpen ? (
                <X weight="bold" className="h-5 w-5" />
              ) : (
                <List weight="bold" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-[var(--z-overlay)] flex flex-col bg-white px-4 py-6 md:hidden dark:bg-slate-950">
          <div className="flex flex-col gap-2">
            <p className="px-3 text-xs font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
              Compare & Explore
            </p>
            {navItems.map(({ href, label, description, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(`${href}/`));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-start gap-3.5 rounded-xl p-3.5 transition-colors",
                    isActive
                      ? "border border-blue-100 bg-blue-50/70 text-[#0160c4] dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-[#38b6ff]"
                      : "hover:bg-slate-50 dark:hover:bg-slate-900",
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                      isActive
                        ? "bg-[#0160c4] text-white dark:bg-[#38b6ff] dark:text-slate-950"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
                    )}
                  >
                    <Icon weight="bold" className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-900 dark:text-white">
                      {label}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
            <Link
              href="/credit-cards"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] py-3 text-center text-base font-semibold text-white shadow-xs transition-colors hover:bg-[#0052cc]"
            >
              <span>Compare All Offers</span>
              <ArrowRight weight="bold" className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              Free, independent comparison for credit card and bank promos.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
