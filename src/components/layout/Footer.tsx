import Link from 'next/link';
import { CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CreditCard className="h-6 w-6 text-fintech-purple" />
              <span className="text-xl font-bold">churn.cc</span>
            </Link>
            <p className="text-muted-foreground">
              Find the best credit card and bank account offers to maximize your rewards and cash back.
            </p>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Explore</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/credit-cards" className="text-muted-foreground hover:text-fintech-purple">
                Credit Cards
              </Link>
              <Link href="/bank-accounts" className="text-muted-foreground hover:text-fintech-purple">
                Bank Accounts
              </Link>
              <Link href="/resources" className="text-muted-foreground hover:text-fintech-purple">
                Resources
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Popular Card Issuers</h3>
            <nav className="flex flex-col gap-2">
              <Link 
                href="/credit-cards?issuer=CHASE" 
                className="text-muted-foreground hover:text-fintech-purple"
              >
                Chase
              </Link>
              <Link 
                href="/credit-cards?issuer=AMERICAN_EXPRESS" 
                className="text-muted-foreground hover:text-fintech-purple"
              >
                American Express
              </Link>
              <Link 
                href="/credit-cards?issuer=CAPITAL_ONE" 
                className="text-muted-foreground hover:text-fintech-purple"
              >
                Capital One
              </Link>
              <Link 
                href="/credit-cards?issuer=CITI" 
                className="text-muted-foreground hover:text-fintech-purple"
              >
                Citi
              </Link>
            </nav>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium">Legal</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy" className="text-muted-foreground hover:text-fintech-purple">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-fintech-purple">
                Terms of Service
              </Link>
              <Link href="/affiliates" className="text-muted-foreground hover:text-fintech-purple">
                Affiliate Disclosure
              </Link>
            </nav>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 border-t pt-6 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} churn.cc. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            Card offers and bank promotions are subject to change. See issuer websites for current details.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
