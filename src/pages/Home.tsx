
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import CreditCardGrid from "@/components/cards/CreditCardGrid";
import BankAccountGrid from "@/components/cards/BankAccountGrid";
import { CreditCard as CreditCardIcon, BanknoteIcon, ArrowRight, TrendingUp } from "lucide-react";
import { CreditCard, BankAccount } from "@/types";
import { fetchCreditCards, getMockBankAccounts } from "@/services/api";

const Home = () => {
  const [featuredCards, setFeaturedCards] = useState<CreditCard[]>([]);
  const [featuredAccounts, setFeaturedAccounts] = useState<BankAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedItems = async () => {
      setIsLoading(true);
      try {
        // Fetch credit card data
        const cards = await fetchCreditCards();
        
        // Get top cards by offer amount
        const topCards = [...cards]
          .filter(card => !card.discontinued && card.offers.length > 0)
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        
        setFeaturedCards(topCards);
        
        // Get bank account data
        const accounts = getMockBankAccounts();
        
        // Get top accounts by offer amount
        const topAccounts = [...accounts]
          .sort((a, b) => b.offerAmount - a.offerAmount)
          .slice(0, 3);
        
        setFeaturedAccounts(topAccounts);
      } catch (error) {
        console.error("Error loading featured items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeaturedItems();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fintech-purple to-fintech-blue px-4 py-16 text-white">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Find Your Perfect Credit Card & Bank Bonus
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Compare the best credit card offers and bank account bonuses to maximize your rewards.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-fintech-purple hover:bg-white/90">
              <Link to="/credit-cards">
                <CreditCardIcon className="mr-2 h-5 w-5" />
                Explore Credit Cards
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-fintech-orange hover:bg-fintech-orange/90">
              <Link to="/bank-accounts">
                <BanknoteIcon className="mr-2 h-5 w-5" />
                Find Bank Bonuses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Credit Cards Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Featured Credit Card Offers</h2>
              <p className="mt-2 text-muted-foreground">
                Top credit card bonuses available right now
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/credit-cards">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="h-96">
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-fintech-purple border-t-transparent" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <CreditCardGrid 
              cards={featuredCards} 
              emptyMessage="No featured credit cards available at the moment." 
            />
          )}
        </div>
      </section>

      {/* Featured Bank Accounts Section */}
      <section className="bg-gray-50 px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Top Bank Account Bonuses</h2>
              <p className="mt-2 text-muted-foreground">
                Best bank account offers to earn extra cash
              </p>
            </div>
            <Button asChild variant="outline">
              <Link to="/bank-accounts">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="h-96">
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-fintech-purple border-t-transparent" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <BankAccountGrid 
              accounts={featuredAccounts} 
              emptyMessage="No featured bank accounts available at the moment." 
            />
          )}
        </div>
      </section>

      {/* Why Use Card Bonanza Hub Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">Why Use Card Bonanza Hub?</h2>
            <p className="mt-2 text-muted-foreground">
              We help you find the best financial offers and maximize your rewards
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-purple/10">
                  <CreditCardIcon className="h-6 w-6 text-fintech-purple" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Compare All Offers</h3>
                <p className="text-muted-foreground">
                  Easily compare all available credit card and bank account offers in one place
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-orange/10">
                  <TrendingUp className="h-6 w-6 text-fintech-orange" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Maximize Your Returns</h3>
                <p className="text-muted-foreground">
                  Find the highest welcome bonuses and ongoing rewards to get the most value
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-blue/10">
                  <BanknoteIcon className="h-6 w-6 text-fintech-blue" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Exclusive Offers</h3>
                <p className="text-muted-foreground">
                  Access special promotional offers not available to the general public
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-fintech-darkPurple px-4 py-12 text-white md:py-16">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-4 text-2xl font-bold md:text-3xl">
              Ready to Start Earning More Rewards?
            </h2>
            <p className="mb-8 max-w-2xl text-white/80">
              Explore our curated selection of credit card and bank account offers to find the perfect match for your financial needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-fintech-purple hover:bg-fintech-purple/90">
                <Link to="/credit-cards">
                  <CreditCardIcon className="mr-2 h-5 w-5" />
                  Explore Credit Cards
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-fintech-darkPurple hover:bg-white/90">
                <Link to="/bank-accounts">
                  <BanknoteIcon className="mr-2 h-5 w-5" />
                  Find Bank Bonuses
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
