"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import {
  CreditCard,
  Bank,
  BookOpen,
  List,
  X,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
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
    label: "Guides & Tips",
    description: "Playbooks, Chase 5/24 rules, and churning FAQs",
    icon: BookOpen,
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    setIsSearchOpen(false);
    if (q) {
      router.push(`/credit-cards?q=${encodeURIComponent(q)}`);
    } else {
      router.push("/credit-cards");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-[var(--z-nav)] w-full border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-10">
            <BrandLogo size="sm" href="/" />

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
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search offers"
              className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground sm:w-56 sm:border sm:border-border sm:bg-background sm:px-3 sm:hover:border-slate-300 sm:hover:bg-background"
            >
              <MagnifyingGlass weight="bold" className="h-4 w-4 shrink-0" />
              <span className="hidden flex-1 text-left sm:inline">
                Search offers
              </span>
              <kbd className="hidden rounded border border-border px-1.5 font-sans text-[11px] text-muted-foreground sm:inline">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-150 hover:bg-muted md:hidden"
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

      {isOpen && (
        <div className="fixed inset-0 top-16 z-[var(--z-overlay)] flex flex-col bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile Navigation">
            {navItems.map(({ href, label, description, icon: Icon }) => {
              const isActive =
                pathname === href ||
                (href !== "/" && pathname.startsWith(`${href}/`));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-start gap-4 rounded-lg px-3 py-4 transition-colors duration-150",
                    isActive ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  <Icon
                    weight="regular"
                    className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                  />
                  <div>
                    <p className="text-base font-medium text-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="overflow-hidden rounded-xl border border-border bg-background p-0 shadow-xl sm:max-w-xl">
          <DialogTitle className="sr-only">Search Offers</DialogTitle>
          <DialogDescription className="sr-only">
            Search for credit card and bank account bonuses
          </DialogDescription>
          <form onSubmit={handleSearchSubmit} className="flex flex-col">
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <MagnifyingGlass
                weight="bold"
                className="h-5 w-5 shrink-0 text-muted-foreground"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cards, banks, bonuses (e.g. Chase, $300, travel)..."
                autoFocus
                className="w-full bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded px-1.5 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 bg-muted px-4 py-3 text-sm">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-muted-foreground">Popular</span>
                {["Chase", "Capital One", "Amex", "Travel", "Cash Back"].map(
                  (term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        router.push(
                          `/credit-cards?q=${encodeURIComponent(term)}`,
                        );
                      }}
                      className="rounded-md border border-border bg-background px-2 py-0.5 text-foreground transition-colors duration-150 hover:border-slate-300"
                    >
                      {term}
                    </button>
                  ),
                )}
              </div>
              <button
                type="submit"
                className={cn(buttonVariants({ size: "sm" }), "ml-auto")}
              >
                Search
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
