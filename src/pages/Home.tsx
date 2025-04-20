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
        const cards = await fetchCreditCards();
        const topCards = [...cards]
          .filter(card => !card.discontinued && card.offers.length > 0)
          .sort((a, b) => {
            const aOffer = a.offers[0]?.amount[0]?.amount || 0;
            const bOffer = b.offers[0]?.amount[0]?.amount || 0;
            return bOffer - aOffer;
          })
          .slice(0, 4);
        setFeaturedCards(topCards);
        
        const accounts = getMockBankAccounts();
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
      <section className="relative overflow-hidden bg-gradient-to-br from-fintech-purple to-fintech-blue px-4 py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-fintech-orange/20 blur-3xl"></div>
          <div className="absolute -left-1/4 top-1/2 h-96 w-96 animate-pulse rounded-full bg-fintech-purple/20 blur-3xl"></div>
        </div>
        <div className="container relative mx-auto flex flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
            <TrendingUp className="mr-2 h-4 w-4 text-fintech-orange" />
            <span>Average user earns $2,500+ in first year bonuses</span>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Maximize Your{" "}
            <span className="bg-gradient-to-r from-fintech-orange to-white bg-clip-text text-transparent">
              Money
            </span>
            <br />
            with Card & Bank Bonuses
          </h1>
          
          <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
            Join thousands of smart churners who earn{" "}
            <span className="font-semibold text-fintech-orange">$1,000s in bonuses</span>{" "}
            every year. We track the best credit card and bank account offers so you don't have to.
          </p>
          
          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-fintech-purple hover:bg-white/90">
              <Link to="/credit-cards">
                <CreditCard className="mr-2 h-5 w-5" />
                Find Credit Card Offers
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-fintech-orange hover:bg-fintech-orange/90">
              <Link to="/bank-accounts">
                <BanknoteIcon className="mr-2 h-5 w-5" />
                Explore Bank Bonuses
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-fintech-orange/20 p-3">
                <CreditCard className="h-6 w-6 text-fintech-orange" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Credit Card Bonuses</h3>
              <p className="text-white/80">Up to $1,000+ per card sign-up bonus</p>
            </div>
            
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-fintech-blue/20 p-3">
                <BanknoteIcon className="h-6 w-6 text-fintech-blue" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Bank Account Bonuses</h3>
              <p className="text-white/80">Earn $200-$500 per new account</p>
            </div>
            
            <div className="flex flex-col items-center rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-fintech-purple/20 p-3">
                <TrendingUp className="h-6 w-6 text-fintech-purple" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Track Your Progress</h3>
              <p className="text-white/80">Easy tracking of your bonus progress</p>
            </div>
          </div>
        </div>
      </section>

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
