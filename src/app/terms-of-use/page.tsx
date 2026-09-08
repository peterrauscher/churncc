import { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Terms of Use | Churnable",
  description:
    "Review the terms and conditions governing your use of Churnable's comparison tools, calculators, and educational content.",
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f6f8] py-8 md:py-14 dark:bg-slate-950">
      <PageContainer className="max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <PageHeader title="Terms of Use" />

        <div className="space-y-10 md:space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              1. Acceptance of Terms
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                By accessing or using Churnable (the &quot;Site&quot;), you
                agree to be bound by these Terms of Use and our Privacy Policy.
                If you do not agree to these terms, please do not use our
                services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              2. Educational & Comparative Use (Not Financial Advice)
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Churnable is an independent informational and comparative
                platform designed to help consumers research credit card welcome
                bonuses and bank account deposit promotions.
              </p>
              <p>
                <strong>
                  Churnable is not a bank, lender, credit card issuer, broker,
                  or registered investment advisor.
                </strong>{" "}
                Nothing on this website constitutes personalized financial,
                investment, legal, or tax advice. All calculators, bonus
                projections, and evaluations are estimates provided solely for
                illustrative purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              3. Financial Disclosures & Deposit Insurance
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Deposit accounts reviewed on Churnable (checking, savings, money
                market, CDs) are offered by financial institutions that are
                members of the FDIC or NCUA. Eligible deposits are insured up to
                $250,000 per depositor, per insured institution, for each
                account ownership category.
              </p>
              <p>
                Churnable is not a bank, depository institution, certified
                financial planner, or registered investment advisor. The
                information provided on this site is for educational and
                comparative purposes only and should not be construed as
                individualized financial, tax, or legal advice.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              4. Verification of Third-Party Terms
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Credit card issuers and banking institutions frequently change
                their welcome offer amounts, minimum spending criteria, annual
                fees, interest rates, and promotional expiration dates without
                notice. Bank promotions and credit card welcome bonuses are
                fast-moving and subject to sudden changes or early expiration by
                issuers.
              </p>
              <p>
                While we strive to keep all data accurate and verified daily,{" "}
                <strong>
                  you are solely responsible for reviewing and verifying the
                  official application page, terms, conditions, and fee
                  schedules on the financial institution&apos;s website before
                  submitting an application or depositing funds.
                </strong>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              5. Third-Party Credit & Banking Decisions
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Churnable has no role in reviewing, processing, approving, or
                denying any credit card or bank account application. All credit
                underwriting decisions, account openings, and bonus fulfillment
                obligations rest entirely with the respective financial
                institutions.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              6. Limitation of Liability
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                To the fullest extent permitted by applicable law, Churnable and
                its operators shall not be liable for any direct, indirect,
                incidental, consequential, or punitive damages arising from your
                access to or use of the Site, including but not limited to
                missed bonuses, fee charges, or credit score changes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              7. Contact Information
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                If you have questions or feedback regarding these Terms of Use,
                please contact us at <strong>contact@churn.cc</strong>.
              </p>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
