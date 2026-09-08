import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

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
                  href="/resources"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  All Guides & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Churnable. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <Link
              href="/how-we-are-paid"
              className="hover:text-white transition-colors"
            >
              How We&apos;re Paid
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
