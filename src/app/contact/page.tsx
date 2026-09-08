"use client";

import { useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import {
  EnvelopeSimple,
  CheckCircle,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  XLogo,
  LinkedinLogo,
  YoutubeLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import { socialLinks } from "@/lib/socials";

const contactIcons = {
  x: XLogo,
  linkedin: LinkedinLogo,
  youtube: YoutubeLogo,
  facebook: FacebookLogo,
} as const;

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("bank-bonus");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@churn.cc");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message.trim()) {
      setError("Please enter your message.");
      return;
    }

    setError("");
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#f4f6f8] py-8 md:py-14 dark:bg-slate-950">
      <PageContainer className="max-w-5xl">
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
          title="Contact Us"
          description="Have a question about a bonus, spotted an offer correction, or have feedback? We are here to help."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Direct Support Email & Social Channels */}
          <div className="space-y-6 lg:col-span-5">
            {/* Primary Email Card */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:p-8 dark:bg-slate-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
                <EnvelopeSimple weight="bold" className="h-6 w-6" />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                Official Support Email
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                For general questions, editorial corrections, or partnership
                inquiries:
              </p>

              {/* Copyable Email Box */}
              <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80">
                <span className="font-mono text-sm font-bold text-slate-900 select-all dark:text-white">
                  contact@churn.cc
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-700 dark:hover:text-white"
                  aria-label="Copy email address"
                  title="Copy email address"
                >
                  {copied ? (
                    <Check weight="bold" className="h-4 w-4 text-[#00a859]" />
                  ) : (
                    <Copy weight="bold" className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="mt-4">
                <a
                  href="mailto:contact@churn.cc"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <span>Open in Mail App</span>
                  <ArrowRight weight="bold" className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Social & Community Card */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(15,23,42,0.06)] md:p-8 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 uppercase dark:text-white">
                Follow Us on Social
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Real-time offer alerts and churning tips:
              </p>

              <div className="mt-4 space-y-2">
                {socialLinks.map((social) => {
                  const Icon = contactIcons[social.id];
                  const content = (
                    <>
                      <div className="flex items-center gap-2.5">
                        <Icon
                          weight="bold"
                          className="h-4 w-4 text-slate-900 dark:text-white"
                        />
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">
                          {social.handle} on {social.name}
                        </span>
                      </div>
                      <span
                        className={
                          social.href
                            ? "text-xs font-medium text-[#0160c4] dark:text-[#38b6ff]"
                            : "text-xs font-medium text-slate-400"
                        }
                      >
                        {social.actionLabel}
                      </span>
                    </>
                  );
                  const className =
                    "flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800/80";

                  if (!social.href) {
                    return (
                      <div
                        key={social.id}
                        className={className}
                        aria-label={social.ariaLabel}
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className={`${className} transition-colors hover:bg-slate-100 dark:hover:bg-slate-800`}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="flex items-center gap-2 px-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck
                weight="bold"
                className="h-4 w-4 shrink-0 text-[#00a859]"
              />
              <span>We never sell your contact information. Zero spam.</span>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white p-6 shadow-[0_2px_24px_rgba(15,23,42,0.06)] sm:p-10 dark:bg-slate-900">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-[#00a859] dark:bg-emerald-950">
                    <CheckCircle weight="fill" className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Message Received!
                  </h2>
                  <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                    Thank you for reaching out. We have sent a copy of your
                    inquiry to <strong>contact@churn.cc</strong> and will get
                    back to you within 24 to 48 business hours.
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc]"
                    >
                      <span>Return to Homepage</span>
                      <ArrowRight weight="bold" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Send Us a Message
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Fill out the form below and we will get back to you
                      promptly.
                    </p>
                  </div>

                  {error && (
                    <div className="rounded-xl bg-rose-50 p-3.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-slate-900 uppercase dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="mt-1.5 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#0160c4] dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-900 uppercase dark:text-white"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="mt-1.5 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#0160c4] dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-topic"
                      className="block text-xs font-bold text-slate-900 uppercase dark:text-white"
                    >
                      Inquiry Topic
                    </label>
                    <select
                      id="contact-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1.5 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-all ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#0160c4] dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                    >
                      <option value="bank-bonus">
                        Question about a Bank Account Bonus
                      </option>
                      <option value="credit-card">
                        Question about a Credit Card Offer
                      </option>
                      <option value="correction">
                        Report an Expired or Changed Offer
                      </option>
                      <option value="course">
                        5-Day Email Crash Course Question
                      </option>
                      <option value="feedback">
                        General Feedback / Suggestion
                      </option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-bold text-slate-900 uppercase dark:text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you?"
                      className="mt-1.5 w-full rounded-xl bg-slate-50 p-4 text-sm font-medium text-slate-900 outline-none transition-all ring-1 ring-slate-200 focus:bg-white focus:ring-2 focus:ring-[#0160c4] dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0160c4] py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.98]"
                  >
                    <span>Send Message</span>
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
