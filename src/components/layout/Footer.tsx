import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-24 px-4 pb-8 md:px-8">
      <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-foreground/[0.04] p-1.5 ring-1 ring-foreground/5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-[#1c1612] px-6 py-16 text-[#f7f1e6] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] md:px-12 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="mb-4 inline-flex rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ring-1 ring-white/10">
                Churnable
              </p>
              <p className="font-serif max-w-md text-4xl leading-[1.05] tracking-tight md:text-5xl">
                Take the acquisition budget back.
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#f7f1e6]/65">
                Compare live card and bank bonuses, then claim the money issuers
                already budgeted to buy you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#f7f1e6]/45">
                  Explore
                </p>
                <Link
                  href="/credit-cards"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Credit cards
                </Link>
                <Link
                  href="/bank-accounts"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Bank accounts
                </Link>
                <Link
                  href="/resources"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Guides
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#f7f1e6]/45">
                  Issuers
                </p>
                <Link
                  href="/credit-cards?issuer=CHASE"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Chase
                </Link>
                <Link
                  href="/credit-cards?issuer=AMERICAN_EXPRESS"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  American Express
                </Link>
                <Link
                  href="/credit-cards?issuer=CAPITAL_ONE"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Capital One
                </Link>
                <Link
                  href="/credit-cards?issuer=CITI"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Citi
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#f7f1e6]/45">
                  Legal
                </p>
                <Link
                  href="/privacy"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Terms
                </Link>
                <Link
                  href="/affiliates"
                  className="text-sm text-[#f7f1e6]/80 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[#f7f1e6]"
                >
                  Affiliates
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-[#f7f1e6]/45">
              © {new Date().getFullYear()} Churnable. All rights reserved.
            </p>
            <p className="text-xs text-[#f7f1e6]/45">
              Banks update promos constantly. Verify current terms before you
              apply.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
