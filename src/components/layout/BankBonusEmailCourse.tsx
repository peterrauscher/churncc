"use client";

import React, { useState } from "react";
import { Check, CheckCircle } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LESSONS = [
  "The 3 easiest checking promos ($800+ total)",
  "Direct deposit workarounds that still count",
  "How long to keep each account open",
  "A free bonus tracking spreadsheet",
];

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
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16",
        className,
      )}
    >
      <div className="lg:col-span-7">
        <p className="text-sm font-medium text-primary">
          Free 5-day email course
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Earn your first $1,000 in bank bonuses.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          One short lesson a day on picking the highest-paying bonuses, meeting
          direct deposit requirements, and avoiding fees and clawbacks.
        </p>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 text-[15px] text-foreground sm:grid-cols-2">
          {LESSONS.map((lesson) => (
            <li key={lesson} className="flex items-start gap-3">
              <Check
                weight="bold"
                className="mt-1 h-4 w-4 shrink-0 text-positive"
              />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-5 lg:pt-10">
        {isSubmitted ? (
          <div className="flex items-start gap-3" role="status">
            <CheckCircle
              weight="fill"
              className="mt-0.5 h-6 w-6 shrink-0 text-positive"
            />
            <div>
              <p className="text-base font-semibold text-foreground">
                You&apos;re on the list.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Lesson 1 is on its way to {email}.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="course-email"
              className="block text-sm font-medium text-foreground"
            >
              Email address
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                id="course-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@example.com"
                aria-invalid={!!error}
                aria-describedby={error ? "course-email-error" : undefined}
                className="h-12 w-full flex-1 rounded-lg border border-border bg-background px-4 text-[15px] text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 hover:border-slate-300 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:ring-offset-0 aria-invalid:border-destructive"
              />
              <button type="submit" className={buttonVariants({ size: "lg" })}>
                Start the course
              </button>
            </div>
            {error ? (
              <p
                id="course-email-error"
                className="mt-2 text-sm text-destructive"
              >
                {error}
              </p>
            ) : null}
            <p className="mt-3 text-sm text-muted-foreground">
              Free. No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default BankBonusEmailCourse;
