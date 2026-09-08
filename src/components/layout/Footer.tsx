import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#0f172a] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <BrandLogo size="md" href="/" className="[&_span]:text-white" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              The premier bonus optimization platform. We track live credit card
              welcome bonuses and bank account promotions so you can keep more
              money from every paycheck.
            </p>
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

          {/* Column 3: Resources */}
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
        </div>

        {/* Editorial Disclosure and Legal Notes */}
        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/80 p-6">
          <p className="text-xs font-semibold text-white uppercase">
            Editorial Disclosure & Disclaimer
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Churnable is an independent comparison service. We may receive
            compensation from card issuers or financial institutions when you
            click links to products. However, this compensation does not impact
            our editorial rankings, recommendations, or calculations. Offers and
            promotional rates are subject to change without notice. Please
            review the official terms on the issuer or bank website before
            applying.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Deposit products from partner institutions are FDIC or NCUA insured
            up to the allowable limits. Churnable is not an investment advisor
            or depository institution.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Churnable. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <Link
              href="/resources"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/resources"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/resources"
              className="hover:text-white transition-colors"
            >
              Editorial Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
