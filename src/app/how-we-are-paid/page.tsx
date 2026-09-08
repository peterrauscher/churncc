import { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { CheckCircle, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "How We're Paid - Editorial & Referral Disclosure | Churnable",
  description:
    "Complete transparency into how Churnable makes money through standard consumer referral links and maintains 100% editorial independence.",
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
          description="Complete transparency into our revenue model, our referral links, and our strict editorial independence."
        />

        <div className="space-y-10 md:space-y-12">
          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Standard Consumer Referral Programs Only
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                To be completely transparent:{" "}
                <strong>
                  Churnable is supported solely through standard referral
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
                program that any regular customer can participate in, we will
                use that referral link to help support the ongoing development,
                server costs, and daily data tracking of Churnable.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Zero Paid Promotions or Sponsored Reviews
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                <strong>
                  We do not receive any payments to promote, rank, or review
                  specific financial products.
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
                      offers zero referral bonus to us, we still list and
                      recommend it at the top of our tables.
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
                      Banks and card issuers have zero editorial say, review
                      rights, or advance notice of our ratings, guides, and
                      calculators.
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
