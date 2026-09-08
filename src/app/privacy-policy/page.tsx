import { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacy Policy | Churnable",
  description:
    "Learn how Churnable protects your privacy, handles data collection, and manages outbound referral links.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2026";

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

        <PageHeader
          title="Privacy Policy"
          description={`Last updated: ${lastUpdated}. Understand how we handle information when you use our comparison tools and email course.`}
        />

        <div className="space-y-10 md:space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              1. Overview & Our Commitment to Privacy
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                At Churnable, we respect your privacy. We are an independent
                financial comparison platform designed to help consumers
                evaluate credit card welcome offers and bank account promotions.
              </p>
              <p>
                We do not sell personal data, nor do we collect sensitive
                personal identifiers like Social Security numbers, bank account
                logins, or credit scores. You can browse all comparison tables,
                calculators, and reviews anonymously without creating an
                account.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              2. Information We Collect
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <h3 className="font-bold text-slate-900 dark:text-white">
                A. Information You Provide Voluntarily
              </h3>
              <p>
                When you sign up for our free 5-day bank bonus email course or
                contact us directly, we collect your email address. We use this
                email address solely to deliver the course lessons and related
                educational insights. You may unsubscribe at any time using the
                link in any message.
              </p>

              <h3 className="font-bold text-slate-900 dark:text-white">
                B. Automatically Collected Technical Data
              </h3>
              <p>
                Like most modern web services, our servers log standard
                aggregate technical information, including your IP address,
                browser type, operating system, referring URLs, and timestamps.
                This data is used in aggregate to monitor site reliability,
                prevent abuse, and optimize performance.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              3. Outbound Links & Third-Party Financial Institutions
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Churnable contains links to external websites operated by credit
                card issuers and banking institutions (such as Chase, American
                Express, Capital One, Citibank, and others).
              </p>
              <p>
                When you click an outbound button or link (such as &quot;Apply
                Now&quot; or &quot;Claim Bonus&quot;), you leave Churnable and
                navigate to the third party&apos;s website. Any information you
                submit on that third-party site (such as credit applications or
                personal deposit information) is governed by that
                institution&apos;s privacy policy, not ours. We strongly
                encourage you to review their privacy statements before
                submitting personal data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              4. Cookies & Web Technologies
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                We use cookies and browser local storage strictly for functional
                purposes (such as preserving theme preferences and session
                security) and anonymous performance analytics. You can adjust
                your browser settings to reject cookies, though some site
                preferences may not be saved.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              5. Your Privacy Rights & Contact
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                Depending on your jurisdiction (including California CCPA/CPRA
                and European GDPR), you have the right to request access to or
                deletion of any personal information we hold (such as your email
                address on our course list).
              </p>
              <p>
                To exercise any privacy rights, or if you have questions about
                this policy, please reach out to us at{" "}
                <strong>contact@churn.cc</strong>.
              </p>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
