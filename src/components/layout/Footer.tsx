import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import {
  XLogo,
  LinkedinLogo,
  YoutubeLogo,
  FacebookLogo,
} from "@phosphor-icons/react/dist/ssr";
const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand Column - Logo only */}
          <div className="col-span-2 md:col-span-1">
            <BrandLogo size="md" href="/" className="[&_span]:text-white" />
          </div>

          {/* Column 1: Cards */}
          <div>
            <p className="text-xs font-bold tracking-wider text-white uppercase">
              Credit Cards
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/credit-cards"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  All Credit Card Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?fee=0"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  No Annual Fee Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?type=travel"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Travel Rewards Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?type=cashback"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Cash Back Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Bank Accounts */}
          <div>
            <p className="text-xs font-bold tracking-wider text-white uppercase">
              Banking
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/bank-accounts"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  All Bank Account Bonuses
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?type=checking"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Checking Account Promos
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?type=savings"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  High-Yield Savings Bonuses
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?fee=0"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  No Monthly Fee Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Guides & Tips */}
          <div>
            <p className="text-xs font-bold tracking-wider text-white uppercase">
              Guides & Tips
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Beginner Churning Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Chase 5/24 Rule Explained
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Direct Deposit Requirements
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Bonus Tax Rules (1099-INT)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Help */}
          <div>
            <p className="text-xs font-bold tracking-wider text-white uppercase">
              Help
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/how-we-are-paid"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  How We&apos;re Paid
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar without HR divider */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Churnable. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://x.com/churncc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow Churnable on X"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <XLogo weight="bold" className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Churnable on LinkedIn (coming soon)"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LinkedinLogo weight="bold" className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Churnable on YouTube (coming soon)"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <YoutubeLogo weight="bold" className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Churnable on Facebook (coming soon)"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <FacebookLogo weight="bold" className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
