import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ShieldCheck, Sparkle } from "@phosphor-icons/react/dist/ssr";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <BrandLogo size="md" href="/" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              The premier bonus optimization platform. We track live credit card
              welcome bonuses and bank account promotions so you can keep more
              money from every paycheck.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck
                  weight="bold"
                  className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                />
                <span>100% Unbiased Rankings</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                <Sparkle
                  weight="bold"
                  className="h-3.5 w-3.5 text-[#0160c4] dark:text-[#38b6ff]"
                />
                <span>Daily Rate Tracking</span>
              </span>
            </div>
          </div>

          {/* Column 1: Cards */}
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Credit Cards
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/credit-cards"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  All Credit Card Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?fee=0"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  No Annual Fee Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?type=travel"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Travel Rewards Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/credit-cards?type=cashback"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Cash Back Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Bank Accounts */}
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Banking
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/bank-accounts"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  All Bank Account Bonuses
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?type=checking"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Checking Account Promos
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?type=savings"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  High-Yield Savings Bonuses
                </Link>
              </li>
              <li>
                <Link
                  href="/bank-accounts?fee=0"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  No Monthly Fee Accounts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <p className="text-xs font-bold tracking-wider text-slate-900 uppercase dark:text-white">
              Guides & Tools
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link
                  href="/resources"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Beginner Churning Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Chase 5/24 Rule Explained
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Direct Deposit Requirements
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-slate-600 transition-colors hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
                >
                  Bonus Tax Rules (1099-INT)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Editorial Disclosure and Legal Notes */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold text-slate-900 uppercase dark:text-white">
            Editorial Disclosure & Disclaimer
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Churnable is an independent comparison service. We may receive
            compensation from card issuers or financial institutions when you
            click links to products. However, this compensation does not impact
            our editorial rankings, recommendations, or calculations. Offers and
            promotional rates are subject to change without notice. Please
            review the official terms on the issuer or bank website before
            applying.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Deposit products from partner institutions are FDIC or NCUA insured
            up to the allowable limits. Churnable is not an investment advisor
            or depository institution.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            (c) {new Date().getFullYear()} Churnable. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <Link
              href="/resources"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Terms of Service
            </Link>
            <Link
              href="/resources"
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/resources"
              className="hover:text-slate-900 dark:hover:text-white"
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
