export function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://churn.cc/#website",
    url: "https://churn.cc",
    name: "Churnable",
    alternateName: ["Churnable Financial", "churn.cc"],
    description:
      "Compare 1,000+ credit card welcome offers and bank account signup bonuses. 100% free, unbiased, and merit-ranked financial rewards intelligence.",
    publisher: {
      "@id": "https://churn.cc/#organization",
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://churn.cc/credit-cards?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://churn.cc/#organization",
    name: "Churnable",
    url: "https://churn.cc",
    logo: {
      "@type": "ImageObject",
      url: "https://churn.cc/logo-icon.svg",
      width: "512",
      height: "512",
    },
    description:
      "Independent financial rewards comparison platform analyzing credit card welcome bonuses and bank account promotions.",
    sameAs: ["https://facebook.com/churnable"],
    knowsAbout: [
      "Credit card welcome offers",
      "Bank account bonuses",
      "Chase 5/24 rule",
      "Points valuation",
      "Direct deposit promotions",
      "1099-INT tax reporting",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://churn.cc/#faq",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do credit card welcome bonuses work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A credit card welcome bonus is an incentive offered by card issuers to new cardholders who meet a specified spending threshold within an introductory timeframe (typically 90 to 180 days). Bonuses are delivered as cash back statement credits or loyalty points redeemable for travel, gift cards, or merchandise.",
        },
      },
      {
        "@type": "Question",
        name: "What is the Chase 5/24 rule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Chase 5/24 rule is an unwritten underwriting policy where Chase will automatically deny applications for most personal credit cards if the applicant has opened 5 or more personal credit cards with any bank in the preceding 24 months. Most business cards do not add to your 5/24 count.",
        },
      },
      {
        "@type": "Question",
        name: "Are credit card bonuses and bank account bonuses taxable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Credit card welcome bonuses are classified by the IRS as purchase rebates and are generally 100% tax-free. In contrast, bank account signup bonuses are treated as taxable interest income. Banks issue Form 1099-INT for cumulative bonuses of $10 or more in a calendar year.",
        },
      },
      {
        "@type": "Question",
        name: "How does Churnable calculate points valuations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Churnable converts loyalty currencies into estimated USD using conservative redemption rates (typically 1.0¢ to 1.5¢ per point for transferable currencies like Chase Ultimate Rewards and Amex Membership Rewards; 0.5¢ to 0.8¢ for hotel and budget airline programs) to reflect realistic net payout rather than inflated marketing figures.",
        },
      },
      {
        "@type": "Question",
        name: "Does opening multiple credit cards hurt your credit score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Applying for a card generates a temporary hard inquiry (typically a 3 to 5 point drop that recovers within 2 to 3 months). Over time, opening cards increases total available credit and lowers overall credit utilization, which frequently raises your credit score provided balances are paid in full on time every month.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default JsonLd;
