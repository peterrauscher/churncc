import { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { CheckCircle, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "How We're Paid - Editorial & Referral Disclosure | Churnable",
  description:
    "Complete transparency into how Churnable makes money through standard referral links, display advertising, and newsletter sponsorships while maintaining 100% editorial independence.",
};

export default function HowWerePaidPage() {
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
          title="How We're Paid"
          description="Complete transparency into our revenue model, referral links, advertising, and our strict editorial independence."
        />

        <div className="space-y-10 md:space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Standard Consumer Referral Programs
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                To be completely transparent:{" "}
                <strong>
                  Churnable is supported primarily through standard referral
                  programs that are offered to all everyday consumers.
                </strong>
              </p>
              <p>
                We are <strong>not</strong> an affiliate operating under special
                corporate contracts or exclusive private compensation
                agreements. We simply search for, curate, and link to the credit
                card and bank bonus offers that we find the most helpful,
                lucrative, and user-friendly.
              </p>
              <p>
                If an issuer or financial institution offers a public referral
                program that any regular customer can participate in, we may use
                that referral link to help support the ongoing development,
                server costs, and daily data tracking of Churnable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Display Advertising & Google AdSense
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                We may display programmatic third-party advertisements on select
                pages through advertising networks such as Google AdSense. These
                ads generate revenue based on impressions or clicks and help
                cover server infrastructure, domain maintenance, and development
                costs.
              </p>
              <p>
                Google AdSense and its participating advertisers have{" "}
                <strong>zero influence</strong> over our rankings, calculator
                projections, reviews, or editorial selections. Ad inventory is
                programmatically served and kept completely separate from our
                organic bonus tables and comparison tools. Advertisers cannot
                pay for higher ranking or favorable placement in our tables.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Sponsored Content in Our Newsletter
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                From time to time, our newsletter or email crash course may
                feature sponsored messages, partner highlights, or dedicated
                promotions from vetted partners.
              </p>
              <p>
                <strong>
                  Please note that any sponsored content in our newsletter will
                  always be clearly and conspicuously labeled as such upfront
                </strong>{" "}
                (e.g., with tags such as &ldquo;Sponsored&rdquo;,
                &ldquo;Ad&rdquo;, or &ldquo;Partner Promotion&rdquo; placed
                prominently before the content). We will never disguise paid
                promotional content as organic editorial recommendations.
              </p>
              <p>
                Newsletter sponsors have no influence over our website rankings,
                methodology, or editorial reviews.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Strict Editorial Independence
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>
                  We do not accept payments to promote, rank, or alter our
                  reviews of specific financial products.
                </strong>
              </p>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-[0_2px_16px_rgba(15,23,42,0.06)] dark:bg-slate-900">
                  <CheckCircle
                    weight="fill"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#00a859]"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Merit-Based Rankings
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      If an offer has the highest bonus in the country but
                      offers zero referral bonus or revenue to us, we still list
                      and recommend it at the top of our tables.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-[0_2px_16px_rgba(15,23,42,0.06)] dark:bg-slate-900">
                  <CheckCircle
                    weight="fill"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#00a859]"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      No Corporate Influence
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Banks, card issuers, and advertisers have zero editorial
                      say, review rights, or advance notice of our ratings,
                      guides, and calculators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageContainer>
    </div>
  );
}
