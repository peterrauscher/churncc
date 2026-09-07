"use client";

import React, { useState } from "react";
import {
  EnvelopeSimple,
  CheckCircle,
  Sparkle,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface BankBonusEmailCourseProps {
  className?: string;
}

export function BankBonusEmailCourse({ className }: BankBonusEmailCourseProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_4px_28px_rgba(15,23,42,0.06)] sm:p-12 md:p-16 dark:bg-slate-900",
        className,
      )}
    >
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Left Column: Course details & value prop */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkle weight="fill" className="h-3.5 w-3.5 text-[#00bf63]" />
            <span>Free 5-Day Email Crash Course</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Earn your first $1,000 in bank bonuses.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            We will help you by sending step-by-step instructions to complete
            the easiest and highest-paying bank bonuses, satisfy direct deposit
            requirements, and avoid monthly maintenance fees or clawbacks.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle
                weight="fill"
                className="h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>The 3 easiest checking promos ($800+ total)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle
                weight="fill"
                className="h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>Direct deposit workarounds that work</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle
                weight="fill"
                className="h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>Exact account retention timelines</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle
                weight="fill"
                className="h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>Free bonus tracking spreadsheet</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sign up box */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-[#f4f6f8] p-6 sm:p-8 dark:bg-slate-800/80">
            {isSubmitted ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-[#00a859] dark:bg-emerald-950">
                  <CheckCircle weight="fill" className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  You are on the list!
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  Check your inbox for Lesson 1: Finding and qualifying for the
                  highest-payout checking bonuses this month.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="course-email"
                    className="block text-xs font-bold text-slate-900 uppercase dark:text-white"
                  >
                    Email Address
                  </label>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    We will send one actionable lesson per day for 5 days.
                  </p>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <EnvelopeSimple weight="bold" className="h-4 w-4" />
                    </div>
                    <input
                      id="course-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="you@example.com"
                      className="w-full rounded-xl bg-white py-3 pr-4 pl-10 text-sm font-medium text-slate-900 shadow-xs outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-[#0160c4] dark:bg-slate-900 dark:text-white dark:ring-slate-700"
                    />
                  </div>
                  {error && (
                    <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                >
                  <span>Start Free 5-Day Course</span>
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </button>

                <div className="flex items-center justify-center gap-1.5 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck
                    weight="bold"
                    className="h-3.5 w-3.5 text-slate-400"
                  />
                  <span>100% free. No spam. Unsubscribe anytime.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BankBonusEmailCourse;
