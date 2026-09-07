"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BankAccount } from "@/types";
import { fetchBankAccountById } from "@/services/api";
import {
  Bank as BankIcon,
  CalendarBlank,
  CheckCircle,
  Info,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import { PageContainer } from "@/components/shared/PageContainer";
import { EmptyState } from "@/components/shared/EmptyState";
import { Separator } from "@/components/ui/separator";

export default function BankAccountDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
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

    if (id) {
      loadBankAccount();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <PageContainer className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#0160c4] border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">
            Loading bank offer details...
          </p>
        </div>
      </PageContainer>
    );
  }

  if (!account) {
    return (
      <PageContainer className="py-8 md:py-16">
        <div className="mb-6">
          <Link
            href="/bank-accounts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            <span>Back to Bank Accounts</span>
          </Link>
        </div>
        <EmptyState
          icon={BankIcon}
          title="Account Not Found"
          description={`The bank promotion with ID "${id || "N/A"}" does not exist or has expired.`}
          actionHref="/bank-accounts"
          actionLabel="Browse All Bank Accounts"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8 md:py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/bank-accounts"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0160c4] dark:text-slate-400 dark:hover:text-[#38b6ff]"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
          <span>Back to All Bank Promos</span>
        </Link>
      </div>

      {/* Main Grid: Left = Info & Welcome Offer, Right = Visual & Terms */}
      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Bank Hero Details */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 uppercase dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
                {account.institution}
              </span>
              <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-[#0160c4] uppercase dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-[#38b6ff]">
                {account.type}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <ShieldCheck weight="bold" className="h-3 w-3" />
                <span>FDIC Insured</span>
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl dark:text-white">
              {account.institution} {account.name}
            </h1>

            {account.description && (
              <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {account.description}
              </p>
            )}

            {/* Quick Fee & Requirement Metrics */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Monthly Fee
                </span>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {account.monthlyFee ? `$${account.monthlyFee}` : "$0 / None"}
                </p>
                {account.isMonthlyFeeWaivable && (
                  <p className="mt-1 text-xs font-semibold text-[#00a859]">
                    Fee Waivable
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Direct Deposit
                </span>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {account.directDepositRequired
                    ? account.directDepositAmount
                      ? `$${account.directDepositAmount.toLocaleString()}`
                      : "Required"
                    : "Not Required"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Qualifying deposit
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900 sm:col-span-1 col-span-2">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Min Balance
                </span>
                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {account.minimumBalance !== undefined
                    ? account.minimumBalance === 0
                      ? "$0"
                      : `$${account.minimumBalance.toLocaleString()}`
                    : "$0"}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  To maintain account
                </p>
              </div>
            </div>
          </div>

          {/* Current Welcome Promo Box */}
          <div className="rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/80 to-white p-6 shadow-xs dark:border-emerald-900/60 dark:from-emerald-950/40 dark:to-slate-900 md:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-emerald-800 uppercase dark:text-emerald-400">
                Cash Welcome Bonus
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Sparkle weight="fill" className="h-3.5 w-3.5" />
                <span>Verified Promotion</span>
              </span>
            </div>

            <div className="mt-2">
              <span className="text-4xl font-extrabold text-[#00a859] sm:text-5xl dark:text-emerald-400">
                ${account.offerAmount.toLocaleString()}
              </span>
            </div>

            <div className="mt-4 rounded-lg bg-white/80 p-3 text-xs text-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">
                Bonus Requirements:{" "}
              </span>
              <span>{account.requirements}</span>
            </div>

            {account.expirationDate && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <CalendarBlank weight="bold" className="h-4 w-4" />
                <span>
                  Offer expires:{" "}
                  {new Date(account.expirationDate).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" },
                  )}
                </span>
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
              >
                <span>Open Account on Bank Site</span>
                <ArrowUpRight weight="bold" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Overview Checklist & Additional Info */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-8 lg:col-span-5">
          {account.imageUrl ? (
            <div className="relative mb-6 flex h-48 w-full items-center justify-center rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
              <Image
                src={account.imageUrl}
                alt={`${account.name} from ${account.institution}`}
                width={300}
                height={160}
                unoptimized
                className="max-h-40 w-auto object-contain drop-shadow-md"
              />
            </div>
          ) : (
            <div className="mb-6 flex h-48 w-full items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-950">
              <BankIcon
                weight="duotone"
                className="h-20 w-20 text-slate-300 dark:text-slate-700"
              />
            </div>
          )}

          <h3 className="text-sm font-bold text-slate-900 uppercase dark:text-white">
            What You Need to Know
          </h3>

          <ul className="mt-4 space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle
                weight="fill"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Institution:
                </strong>{" "}
                {account.institution}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle
                weight="fill"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Account Type:
                </strong>{" "}
                {account.type}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle
                weight="fill"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Cash Bonus:
                </strong>{" "}
                ${account.offerAmount.toLocaleString()}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle
                weight="fill"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>
                <strong className="text-slate-900 dark:text-white">
                  Monthly Fee:
                </strong>{" "}
                {account.monthlyFee
                  ? `$${account.monthlyFee}`
                  : "$0 / No monthly fee"}
              </span>
            </li>
            {account.directDepositRequired && (
              <li className="flex items-start gap-2.5">
                <CheckCircle
                  weight="fill"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#00a859]"
                />
                <span>
                  <strong className="text-slate-900 dark:text-white">
                    Direct Deposit:
                  </strong>{" "}
                  Required{" "}
                  {account.directDepositAmount
                    ? `($${account.directDepositAmount.toLocaleString()})`
                    : ""}
                </span>
              </li>
            )}
            {account.availability && (
              <li className="flex items-start gap-2.5">
                <Info
                  weight="fill"
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#0160c4]"
                />
                <span>
                  <strong className="text-slate-900 dark:text-white">
                    Availability:
                  </strong>{" "}
                  {account.availability}
                </span>
              </li>
            )}
          </ul>

          {account.additionalInfo && (
            <>
              <Separator className="my-6" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase dark:text-white">
                  Additional Details
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 whitespace-pre-line dark:text-slate-400">
                  {account.additionalInfo}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
