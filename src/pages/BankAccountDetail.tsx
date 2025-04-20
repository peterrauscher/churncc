
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BankAccount } from "@/types";
import { fetchBankAccountById } from "@/services/api";
import { ArrowLeft, BanknoteIcon, DollarSign, Calendar, Check, Info } from "lucide-react";

const BankAccountDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [account, setAccount] = useState<BankAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBankAccount = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const accountData = await fetchBankAccountById(id);
          setAccount(accountData);
        }
      } catch (error) {
        console.error(`Error loading bank account with ID ${id}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBankAccount();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8 md:px-6">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-fintech-purple border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (!account) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 md:px-6">
          <div className="mb-6">
            <Link to="/bank-accounts" className="flex items-center text-fintech-purple hover:underline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bank Accounts
            </Link>
          </div>
          <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border p-8 text-center">
            <BanknoteIcon className="mb-4 h-16 w-16 text-muted-foreground" />
            <h2 className="mb-2 text-2xl font-bold">Account Not Found</h2>
            <p className="mb-6 text-muted-foreground">
              The bank account you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/bank-accounts">Browse All Bank Accounts</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const accountTypeColors: Record<string, string> = {
    CHECKING: 'bg-fintech-blue text-white',
    SAVINGS: 'bg-fintech-orange text-white',
    BROKERAGE: 'bg-fintech-purple text-white',
    HYBRID: 'bg-fintech-darkPurple text-white',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-6">
          <Link to="/bank-accounts" className="flex items-center text-fintech-purple hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Bank Accounts
          </Link>
        </div>
        
        <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <Badge className={accountTypeColors[account.type] || 'bg-gray-500 text-white'}>
                  {account.type}
                </Badge>
              </div>
              
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">
                {account.institution} {account.name}
              </h1>
              
              <h2 className="mb-6 text-xl font-semibold text-fintech-purple">
                ${account.offerAmount} Bonus
              </h2>
              
              {account.description && (
                <p className="mb-6 text-lg text-muted-foreground">{account.description}</p>
              )}
              
              <Card className="mb-6 border-2 border-fintech-purple">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-xl font-bold">Offer Requirements</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 rounded-full bg-fintech-orange/10 p-1">
                        <Info className="h-5 w-5 text-fintech-orange" />
                      </div>
                      <div>
                        <p className="font-medium">Requirements</p>
                        <p className="text-muted-foreground">{account.requirements}</p>
                      </div>
                    </div>
                    
                    {account.directDepositRequired && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-fintech-purple/10 p-1">
                          <DollarSign className="h-5 w-5 text-fintech-purple" />
                        </div>
                        <div>
                          <p className="font-medium">Direct Deposit Required</p>
                          <p className="text-muted-foreground">
                            {account.directDepositAmount 
                              ? `$${account.directDepositAmount.toLocaleString()} required`
                              : 'Required (amount not specified)'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {account.minimumBalance !== undefined && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-fintech-blue/10 p-1">
                          <DollarSign className="h-5 w-5 text-fintech-blue" />
                        </div>
                        <div>
                          <p className="font-medium">Minimum Balance</p>
                          <p className="text-muted-foreground">
                            ${account.minimumBalance.toLocaleString()} minimum balance required
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {account.expirationDate && (
                      <div className="flex items-start gap-3">
                        <div className="mt-1 rounded-full bg-fintech-red/10 p-1">
                          <Calendar className="h-5 w-5 text-fintech-red" />
                        </div>
                        <div>
                          <p className="font-medium">Offer Expiration</p>
                          <p className="text-muted-foreground">
                            Expires on {new Date(account.expirationDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-muted-foreground">Monthly Fee</p>
                  <p className="text-xl font-medium">
                    {account.monthlyFee ? `$${account.monthlyFee}` : 'No Monthly Fee'}
                  </p>
                  {account.monthlyFee > 0 && account.isMonthlyFeeWaivable && (
                    <p className="text-sm text-fintech-purple">Fee can be waived</p>
                  )}
                </div>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="text-xl font-medium">
                    {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">{account.institution}</p>
                </div>
              </div>
            </div>
            
            <Button 
              asChild 
              className="mt-6 bg-fintech-orange hover:bg-fintech-orange/90 text-white"
            >
              <a 
                href={account.url} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Open Account Now
              </a>
            </Button>
          </div>
          
          <div className="flex flex-col rounded-lg border bg-white p-6 md:p-8">
            <div className="mb-6 rounded-lg bg-gradient-to-r from-fintech-blue to-fintech-purple p-8 text-center text-white">
              <h3 className="mb-2 text-xl font-bold">Bonus Amount</h3>
              <div className="text-5xl font-bold">${account.offerAmount}</div>
              <p className="mt-2 text-white/80">Limited-Time Offer</p>
            </div>
            
            <div className="mb-6">
              <h3 className="mb-4 text-xl font-bold">What You Need to Know</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                  <p>
                    <span className="font-medium">Institution:</span> {account.institution}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                  <p>
                    <span className="font-medium">Account Type:</span> {account.type.charAt(0) + account.type.slice(1).toLowerCase()}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                  <p>
                    <span className="font-medium">Bonus Amount:</span> ${account.offerAmount}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                  <p>
                    <span className="font-medium">Monthly Fee:</span> {account.monthlyFee ? `$${account.monthlyFee}` : 'None'}
                    {account.monthlyFee > 0 && account.isMonthlyFeeWaivable && ' (Can be waived)'}
                  </p>
                </div>
                
                {account.directDepositRequired && (
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                    <p>
                      <span className="font-medium">Direct Deposit:</span> Required
                      {account.directDepositAmount && ` ($${account.directDepositAmount.toLocaleString()})`}
                    </p>
                  </div>
                )}
                
                {account.minimumBalance !== undefined && (
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                    <p>
                      <span className="font-medium">Minimum Balance:</span> ${account.minimumBalance.toLocaleString()}
                    </p>
                  </div>
                )}
                
                {account.expirationDate && (
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 text-fintech-purple" />
                    <p>
                      <span className="font-medium">Expiration:</span> {new Date(account.expirationDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-auto rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 font-medium">How to Earn the Bonus</h4>
              <p className="text-muted-foreground">{account.requirements}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-10">
          <Separator className="mb-6" />
          <p className="text-sm text-muted-foreground">
            Disclaimer: Bank account offers are subject to change. Please verify all terms and conditions with the bank before opening an account.
            Card Bonanza Hub earns a commission when you open an account through our affiliate links.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BankAccountDetail;
