'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, BanknoteIcon, Link as LinkIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const closeMenu = () => {
    if (isMobile && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <CreditCard className="h-6 w-6 text-fintech-purple" />
            <span className="text-xl font-bold">churn.cc</span>
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
                  className="flex items-center gap-2 text-lg font-medium hover:text-fintech-purple"
                  onClick={closeMenu}
                >
                  <CreditCard className="h-5 w-5" />
                  Credit Cards
                </Link>
                <Link
                  href="/bank-accounts"
                  className="flex items-center gap-2 text-lg font-medium hover:text-fintech-purple"
                  onClick={closeMenu}
                >
                  <BanknoteIcon className="h-5 w-5" />
                  Bank Accounts
                </Link>
                <Link
                  href="/resources"
                  className="flex items-center gap-2 text-lg font-medium hover:text-fintech-purple"
                  onClick={closeMenu}
                >
                  <LinkIcon className="h-5 w-5" />
                  Resources
                </Link>
              </nav>
              <div className="mt-auto pt-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search offers..."
                    className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
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
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-fintech-purple"
              >
                <CreditCard className="h-5 w-5" />
                Credit Cards
              </Link>
              <Link
                href="/bank-accounts"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-fintech-purple"
              >
                <BanknoteIcon className="h-5 w-5" />
                Bank Accounts
              </Link>
              <Link
                href="/resources"
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-fintech-purple"
              >
                <LinkIcon className="h-5 w-5" />
                Resources
              </Link>
            </nav>

            <div className="hidden md:flex md:items-center md:gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search offers..."
                  className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
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
