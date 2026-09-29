import Link from "next/link";
import {
  ShieldCheck,
  Scales,
  Coins,
  FileText,
  UserCheck,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

const PRINCIPLES = [
  {
    icon: Scales,
    title: "Ranked by merit, not commissions",
    description:
      "If a bank or card offer pays us $0 but is the highest bonus in the country, it ranks #1. Issuers cannot pay for higher placement or favorable reviews.",
  },
  {
    icon: Coins,
    title: "Honest dollar valuations",
    description:
      "We convert credit card points into realistic dollar values using conservative 1¢–1.5¢/pt rates, not inflated marketing numbers that exaggerate payout.",
  },
  {
    icon: FileText,
    title: "Clear spend & holding rules upfront",
    description:
      "No buried fine print. We show the exact minimum spend hurdle, days allowed, monthly fee waiver terms, and account holding periods before you apply.",
  },
  {
    icon: UserCheck,
    title: "Free, independent, and open",
    description:
      "No login or subscription required. Supported strictly through standard consumer referral links and clear, non-intrusive ads.",
  },
];

export function EditorialStandards({ className }: { className?: string }) {
  return (
    <section className={className}>
      <div className="rounded-3xl border border-slate-200/90 bg-slate-50/70 p-8 sm:p-12 md:p-16 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
            <ShieldCheck
              weight="fill"
              className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
            />
            <span>OUR EDITORIAL GUARANTEE</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Built for people, not banks.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Banks spend billions to win customers, often hiding stringent terms
            in fine print. We make bonuses transparent, honest, and easy to
            collect.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                  <Icon weight="bold" className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/how-we-are-paid"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0160c4] hover:underline dark:text-[#38b6ff]"
          >
            <span>
              Read our complete transparency disclosure: How We&apos;re Paid
            </span>
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EditorialStandards;
