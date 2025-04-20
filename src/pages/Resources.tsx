
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, BanknoteIcon, Info, TrendingUp, Calendar } from "lucide-react";

const Resources = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">Resources & Guides</h1>
          <p className="mt-2 text-muted-foreground">
            Learn how to maximize credit card and bank account bonuses
          </p>
        </div>
        
        <Tabs defaultValue="creditcards" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="creditcards" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Credit Card Strategies
            </TabsTrigger>
            <TabsTrigger value="banks" className="flex items-center gap-2">
              <BanknoteIcon className="h-4 w-4" />
              Bank Bonus Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="creditcards" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-purple/10">
                    <Info className="h-6 w-6 text-fintech-purple" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Understanding Credit Card Bonuses</h3>
                  <p className="text-muted-foreground">
                    Credit card welcome bonuses are incentives offered to new cardholders who meet certain spending requirements within a specified timeframe.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-orange/10">
                    <TrendingUp className="h-6 w-6 text-fintech-orange" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Maximizing Point Values</h3>
                  <p className="text-muted-foreground">
                    Learn how to get the most value from your credit card points through strategic redemptions and transfer partners.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-blue/10">
                    <Calendar className="h-6 w-6 text-fintech-blue" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Timing Your Applications</h3>
                  <p className="text-muted-foreground">
                    Strategies for timing credit card applications to maximize approval odds and take advantage of limited-time offers.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">Credit Card Bonus FAQs</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="chase524">
                  <AccordionTrigger>What is the Chase 5/24 rule?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      The Chase 5/24 rule is an unwritten policy where Chase will automatically reject your credit card application if you've opened 5 or more personal credit cards across all banks in the past 24 months.
                    </p>
                    <p className="mb-3">
                      This rule applies to most Chase credit cards, though there are some exceptions. Business credit cards from most issuers (except Capital One and Discover) typically don't count toward your 5/24 status.
                    </p>
                    <p>
                      To check your 5/24 status, count how many personal credit cards you've opened in the last 24 months across all banks. If you're at or over 5, you'll likely be denied for a new Chase card.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="churning">
                  <AccordionTrigger>What is credit card churning?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Credit card churning refers to the practice of repeatedly opening and closing credit cards to earn welcome bonuses, rewards, and perks multiple times. 
                    </p>
                    <p className="mb-3">
                      However, many issuers have implemented rules to prevent churning. For example, American Express typically has a once-per-lifetime rule for welcome bonuses, while Chase often requires 24-48 months between card welcome bonuses for the same product.
                    </p>
                    <p>
                      While churning can be profitable, it may impact your credit score through hard inquiries and reduced average account age. It's important to approach churning strategically and to understand the potential impact on your credit profile.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="manufactured">
                  <AccordionTrigger>What is manufactured spending?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Manufactured spending refers to techniques used to generate credit card spending (to meet minimum spend requirements) in ways that don't represent actual expenses by converting credit card purchases into cash or cash equivalents.
                    </p>
                    <p className="mb-3">
                      Common methods include purchasing gift cards, money orders, or prepaid debit cards with a credit card, then liquidating them to recoup the funds. 
                    </p>
                    <p>
                      While not illegal, many credit card issuers consider manufactured spending against their terms of service and may close accounts they suspect of engaging in this practice. We don't recommend manufactured spending as it carries significant risks.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="business">
                  <AccordionTrigger>Can I apply for business credit cards as an individual?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Yes, you can apply for business credit cards as a sole proprietor even if you don't have a formal business entity. Many people qualify for business credit cards through side hustles, freelancing, selling items online, or other small-scale income-generating activities.
                    </p>
                    <p className="mb-3">
                      When applying as a sole proprietor, you typically use your Social Security Number instead of an EIN, and your legal name as the business name. You'll need to provide honest estimates of your business revenue and years in business.
                    </p>
                    <p>
                      Business credit cards often have higher welcome bonuses and don't typically report to personal credit reports (except in cases of default), making them attractive for maximizing rewards.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="points">
                  <AccordionTrigger>What are the most valuable types of points?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Transferable points are generally considered the most valuable because of their flexibility. The main transferable points currencies are:
                    </p>
                    <ul className="mb-3 list-disc pl-6">
                      <li>Chase Ultimate Rewards</li>
                      <li>American Express Membership Rewards</li>
                      <li>Capital One Miles</li>
                      <li>Citi ThankYou Points</li>
                    </ul>
                    <p className="mb-3">
                      These points can be transferred to various airline and hotel partners, often at a 1:1 ratio, which allows you to book premium travel experiences that would cost much more if purchased directly.
                    </p>
                    <p>
                      Airline and hotel-specific points can also be valuable, particularly for frequent travelers loyal to specific brands, but they lack the flexibility of transferable points and are subject to devaluations.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
          
          <TabsContent value="banks" className="mt-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-blue/10">
                    <Info className="h-6 w-6 text-fintech-blue" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Bank Account Bonus Basics</h3>
                  <p className="text-muted-foreground">
                    Banks offer cash bonuses to attract new customers who open checking or savings accounts and meet specific requirements like direct deposits or minimum balances.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-orange/10">
                    <BanknoteIcon className="h-6 w-6 text-fintech-orange" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Understanding Direct Deposits</h3>
                  <p className="text-muted-foreground">
                    Many bank bonuses require direct deposits. Learn what qualifies as a direct deposit and how to meet these requirements efficiently.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-fintech-purple/10">
                    <Calendar className="h-6 w-6 text-fintech-purple" />
                  </div>
                  <h3 className="mb-2 text-xl font-medium">Timing Multiple Bank Bonuses</h3>
                  <p className="text-muted-foreground">
                    Strategies for juggling multiple bank account bonuses simultaneously without missing requirements or deadlines.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <h2 className="mb-4 text-2xl font-bold">Bank Account Bonus FAQs</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="taxes">
                  <AccordionTrigger>Are bank account bonuses taxable?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Yes, unlike credit card bonuses (which are considered rebates), bank account bonuses are treated as interest income by the IRS and are taxable. Banks will issue a 1099-INT form for any bonuses you receive.
                    </p>
                    <p className="mb-3">
                      You'll need to report this income when you file your taxes, even if you don't receive a 1099-INT form from the bank (which typically happens if the bonus is under $10).
                    </p>
                    <p>
                      This tax treatment is an important consideration when evaluating bank bonuses, as it effectively reduces the value of the bonus by your marginal tax rate.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="directdeposit">
                  <AccordionTrigger>What counts as a direct deposit?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Technically, a direct deposit is an ACH transfer from your employer or a government benefit provider directly to your bank account. However, many banks have different methods for identifying direct deposits.
                    </p>
                    <p className="mb-3">
                      In some cases, ACH transfers from other banks, payment services, or investment platforms may code as direct deposits and satisfy bonus requirements. However, this varies by bank and can change over time.
                    </p>
                    <p>
                      The safest approach is to use an actual employer or government direct deposit when possible. If that's not an option, research current data points from other users about which transfers are working for the specific bank you're targeting.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="chexsystems">
                  <AccordionTrigger>What is ChexSystems and how does it affect bank bonuses?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      ChexSystems is a consumer reporting agency that banks use to verify the banking history of potential customers. It's similar to a credit bureau but specifically for banking activities.
                    </p>
                    <p className="mb-3">
                      When you open and close multiple bank accounts in a short period (as many bank bonus seekers do), these actions are recorded in ChexSystems. Some banks are sensitive to having many recent inquiries and may deny your application if you have too many.
                    </p>
                    <p>
                      The sensitivity to ChexSystems inquiries varies greatly between banks. Some are very sensitive and may deny applications with just a few recent inquiries, while others are much more lenient. Research a bank's ChexSystems sensitivity before applying.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="earlyclose">
                  <AccordionTrigger>Is there a penalty for closing accounts early?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Many banks require you to keep the account open for a minimum period (typically 90-180 days) or you may have to return the bonus. Review the terms and conditions carefully to understand any early closure penalties.
                    </p>
                    <p className="mb-3">
                      Some banks also have an Early Account Termination Fee if you close the account within a certain timeframe (often 90-180 days). This fee typically ranges from $25 to $50.
                    </p>
                    <p>
                      Additionally, closing accounts too quickly may damage your relationship with the bank and could affect your ability to get approved for future accounts or bonuses with that institution.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="repeat">
                  <AccordionTrigger>Can I earn the same bank bonus multiple times?</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-3">
                      Yes, but most banks have timing restrictions on when you can earn the same bonus again. These restrictions vary by bank:
                    </p>
                    <ul className="mb-3 list-disc pl-6">
                      <li>Some banks allow you to earn bonuses once per calendar year</li>
                      <li>Others require 6, 12, or 24 months since your last bonus</li>
                      <li>Some specify time since account closure</li>
                      <li>A few banks allow only one bonus per lifetime</li>
                    </ul>
                    <p>
                      Always check the fine print in the bonus offer for language like "not available to customers who have received a bonus in the past X months" to understand the specific restrictions.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="rounded-lg bg-gray-50 p-6 md:p-8">
          <h2 className="mb-4 text-2xl font-bold">Disclaimer</h2>
          <p className="mb-4 text-muted-foreground">
            Card Bonanza Hub provides information about credit card and bank account offers as a resource to our users. While we strive to keep information accurate and up-to-date, offers are subject to change without notice. Always review the terms and conditions directly with the credit card issuer or bank before applying.
          </p>
          <p className="text-muted-foreground">
            Card Bonanza Hub may receive compensation when users apply through links on our site. This compensation may impact how and where products appear on the site. Card Bonanza Hub does not include all available credit card or bank account offers.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
