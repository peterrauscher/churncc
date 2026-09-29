import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";

interface EditorialArticle {
  slug: string;
  tag: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  updated: string;
  graphic: React.ReactNode;
}

const ARTICLES: EditorialArticle[] = [
  {
    slug: "chase-5-24-rule-guide",
    tag: "CHASE 5/24 RULE",
    readTime: "8 min read",
    title: "The Master Guide to Chase's 5/24 Rule in 2026",
    excerpt:
      "Chase's unwritten 5/24 rule is the foundation of credit card churning. Discover which cards count against your 5 slots, which business cards stay completely invisible, and the exact order to apply to maximize points.",
    author: "Churnable Editorial",
    updated: "Updated weekly",
    graphic: (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>5/24 SLOT TRACKER</span>
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            3/24 (2 Open Slots)
          </span>
        </div>
        <div className="my-3 grid grid-cols-5 gap-1.5">
          <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-700 dark:bg-slate-800">
            <span className="text-[10px] font-bold text-slate-400">01</span>
            <span className="mt-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
              Sapphire
            </span>
            <span className="text-[9px] text-slate-400">Active</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-700 dark:bg-slate-800">
            <span className="text-[10px] font-bold text-slate-400">02</span>
            <span className="mt-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
              Freedom
            </span>
            <span className="text-[9px] text-slate-400">Active</span>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-700 dark:bg-slate-800">
            <span className="text-[10px] font-bold text-slate-400">03</span>
            <span className="mt-1 text-[11px] font-semibold text-slate-800 dark:text-slate-200">
              Venture X
            </span>
            <span className="text-[9px] text-slate-400">Active</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-emerald-300 bg-emerald-50/50 p-2 text-center dark:border-emerald-800/80 dark:bg-emerald-950/20">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              04
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              OPEN
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-emerald-300 bg-emerald-50/50 p-2 text-center dark:border-emerald-800/80 dark:bg-emerald-950/20">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              05
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              OPEN
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500">
          Next slot falls off: Dec 2026
        </p>
      </div>
    ),
  },
  {
    slug: "direct-deposit-workarounds",
    tag: "BANKING WORKAROUNDS",
    readTime: "5 min read",
    title: "Direct Deposit Workarounds That Actually Work in 2026",
    excerpt:
      "Don't want to reroute your paycheck with HR? Tested ACH transfers, brokerage disbursements, and push transfers from major banks that trigger checking bonuses without payroll changes.",
    author: "Churnable Editorial",
    updated: "Verified this month",
    graphic: (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>ACH DIRECT DEPOSIT EMULATION</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            100% Success
          </span>
        </div>
        <div className="my-3 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-700 dark:bg-slate-800">
            <span className="block font-bold text-slate-800 dark:text-slate-200">
              Fidelity CMA
            </span>
            <span className="text-[10px] text-slate-400">ACH Push Out</span>
          </div>
          <span className="text-slate-400 font-bold">→</span>
          <div className="flex-1 rounded-lg border border-slate-200 bg-white p-2 text-center dark:border-slate-700 dark:bg-slate-800">
            <span className="block font-bold text-slate-800 dark:text-slate-200">
              Chase Total
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400">
              Coded as Payroll
            </span>
          </div>
          <span className="text-slate-400 font-bold">→</span>
          <div className="rounded-lg bg-emerald-600 p-2 text-center text-white">
            <span className="block font-extrabold text-[12px]">+$300</span>
            <span className="text-[9px] text-emerald-100">Paid out</span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500">
          Tested across 14 financial institutions
        </p>
      </div>
    ),
  },
  {
    slug: "taxes-on-bank-bonuses-and-credit-points",
    tag: "TAX & 1099-INT",
    readTime: "4 min read",
    title: "Are Sign-Up Bonuses Taxable? 1099-INT vs. Tax-Free Points",
    excerpt:
      "The IRS treats bank bonuses as taxable interest income, while credit card bonuses are treated as tax-exempt rebates. How to anticipate year-end tax forms and calculate your true net profit.",
    author: "Churnable Editorial",
    updated: "2026 Tax Rules",
    graphic: (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>TAX TREATMENT COMPARISON</span>
          <span className="text-slate-400">IRS Pub 525</span>
        </div>
        <div className="my-3 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-2.5 dark:border-amber-900/60 dark:bg-amber-950/20">
            <span className="block text-[11px] font-bold text-amber-800 dark:text-amber-300">
              Bank Cash Promo
            </span>
            <span className="mt-1 block text-sm font-extrabold text-amber-900 dark:text-amber-200">
              Form 1099-INT
            </span>
            <span className="mt-0.5 block text-[10px] text-amber-700 dark:text-amber-400">
              Taxed as regular income
            </span>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-2.5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <span className="block text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
              Credit Card Points
            </span>
            <span className="mt-1 block text-sm font-extrabold text-emerald-900 dark:text-emerald-200">
              0% Non-Taxable
            </span>
            <span className="mt-0.5 block text-[10px] text-emerald-700 dark:text-emerald-400">
              Classified as spend rebate
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-500">
          Keep 100% of points; account for bank tax withholding
        </p>
      </div>
    ),
  },
  {
    slug: "year-one-churning-roadmap",
    tag: "BEGINNER ROADMAP",
    readTime: "6 min read",
    title: "How to Safely Earn $2,000+ in Year One Without Hurting Your Credit",
    excerpt:
      "Avoid the rookie traps: spacing hard inquiries, hitting minimum spend organically without debt, and knowing retention timelines so issuers never claw back your reward payouts.",
    author: "Churnable Editorial",
    updated: "Updated for 2026",
    graphic: (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>YEAR 1 EARNINGS MILESTONES</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            $2,350 Target
          </span>
        </div>
        <div className="my-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 dark:text-slate-400">
              Month 1–3: Card #1 + Checking
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              $1,050 earned
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full bg-emerald-500" style={{ width: "45%" }} />
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-600 dark:text-slate-400">
              Month 4–8: Card #2 + Savings
            </span>
            <span className="font-bold text-slate-900 dark:text-white">
              $1,950 total
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full bg-emerald-500" style={{ width: "82%" }} />
          </div>
        </div>
        <p className="text-[11px] text-slate-500">
          Zero interest paid, credit score preserved
        </p>
      </div>
    ),
  },
];

export function EditorialGuides({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#0160c4] dark:text-[#38b6ff]">
            <BookOpen weight="bold" className="h-4 w-4" />
            <span>Research & Strategy</span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Guides and playbooks the banks don&apos;t advertise
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            In-depth analysis, rule workarounds, and step-by-step strategies
            written by bonus experts to help you capture maximum rewards with
            zero debt.
          </p>
        </div>
        <Link
          href="/resources"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
        >
          <span>View all guides & FAQs</span>
          <ArrowRight
            weight="bold"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ARTICLES.map((article) => (
          <article
            key={article.slug}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7"
          >
            <div>
              {/* Graphic container */}
              <div className="mb-5 h-40 w-full">{article.graphic}</div>

              {/* Tag & Read time */}
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold tracking-wider text-[#0160c4] uppercase dark:text-[#38b6ff]">
                  {article.tag}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock weight="bold" className="h-3.5 w-3.5" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#0160c4] dark:text-white dark:group-hover:text-[#38b6ff]">
                <Link href="/resources">{article.title}</Link>
              </h3>

              {/* Excerpt */}
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {article.excerpt}
              </p>
            </div>

            {/* Footer with byline and read link */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs dark:border-slate-800">
              <span className="flex items-center gap-1.5 text-slate-500">
                <ShieldCheck
                  weight="bold"
                  className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                />
                <span>
                  {article.author} · {article.updated}
                </span>
              </span>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1 font-semibold text-[#0160c4] group-hover:underline dark:text-[#38b6ff]"
              >
                <span>Read guide</span>
                <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EditorialGuides;
