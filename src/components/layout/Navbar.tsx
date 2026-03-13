"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  BanknoteIcon,
  Link as LinkIcon,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const closeMenu = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="container mx-auto flex h-18 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMenu}
          >
            <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
              <CreditCard className="text-primary h-5 w-5" />
            </div>
            <div>
              <p className="font-serif text-xl leading-none text-foreground">
                Churnable
              </p>
              <p className="text-muted-foreground text-xs">Beat the banks</p>
            </div>
          </Link>
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="flex flex-col items-start gap-6 pt-6">
                <Link
                  href="/credit-cards"
                  className="hover:text-primary flex items-center gap-2 text-lg font-medium"
                  onClick={closeMenu}
                >
                  <CreditCard className="h-5 w-5" />
                  Credit Cards
                </Link>
                <Link
                  href="/bank-accounts"
                  className="hover:text-primary flex items-center gap-2 text-lg font-medium"
                  onClick={closeMenu}
                >
                  <BanknoteIcon className="h-5 w-5" />
                  Bank Accounts
                </Link>
                <Link
                  href="/resources"
                  className="hover:text-primary flex items-center gap-2 text-lg font-medium"
                  onClick={closeMenu}
                >
                  <LinkIcon className="h-5 w-5" />
                  Resources
                </Link>
              </nav>
              <div className="mt-auto pt-6">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search offers..."
                    className="bg-background/70 w-full rounded-full border-border/80 pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/credit-cards"
                className="hover:text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors"
              >
                <CreditCard className="h-5 w-5" />
                Credit Cards
              </Link>
              <Link
                href="/bank-accounts"
                className="hover:text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors"
              >
                <BanknoteIcon className="h-5 w-5" />
                Bank Accounts
              </Link>
              <Link
                href="/resources"
                className="hover:text-primary flex items-center gap-2 text-sm font-semibold tracking-wide uppercase transition-colors"
              >
                <LinkIcon className="h-5 w-5" />
                Resources
              </Link>
            </nav>

            <div className="hidden md:flex md:items-center md:gap-4">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search offers..."
                  className="bg-background/70 w-full rounded-full border-border/80 pl-8 md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
