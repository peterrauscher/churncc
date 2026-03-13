import Link from "next/link";
import { CreditCard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-border/80 bg-card/70">
      <div className="container px-4 py-14 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 border-primary/20 rounded-lg border p-2">
                <CreditCard className="text-primary h-5 w-5" />
              </div>
              <span className="font-serif text-2xl font-semibold">
                Churnable
              </span>
            </Link>
            <p className="text-muted-foreground mt-3 max-w-sm">
              Find the best credit card and bank account offers to maximize your
              rewards and cash back.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Explore
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/credit-cards"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Credit Cards
              </Link>
              <Link
                href="/bank-accounts"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Bank Accounts
              </Link>
              <Link
                href="/resources"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Popular Card Issuers
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/credit-cards?issuer=CHASE"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Chase
              </Link>
              <Link
                href="/credit-cards?issuer=AMERICAN_EXPRESS"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                American Express
              </Link>
              <Link
                href="/credit-cards?issuer=CAPITAL_ONE"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Capital One
              </Link>
              <Link
                href="/credit-cards?issuer=CITI"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Citi
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase">
              Legal
            </h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/affiliates"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Affiliate Disclosure
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t border-border/80 pt-6 md:flex-row md:justify-between">
          <p className="text-muted-foreground text-center text-sm md:text-left">
            © {new Date().getFullYear()} Churnable. All rights reserved.
          </p>
          <p className="text-muted-foreground text-center text-sm md:text-right">
            Card offers and bank promotions are subject to change. See issuer
            websites for current details.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
