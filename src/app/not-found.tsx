"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { WarningCircle, ArrowRight } from "@phosphor-icons/react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      `404 Error: User attempted to access non-existent route: ${pathname}`,
    );
  }, [pathname]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900 md:p-12">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
          <WarningCircle weight="bold" className="h-7 w-7" />
        </div>
        <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
          Error 404
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          This page does not exist, but there are thousands of dollars in live
          credit card and bank bonuses waiting for you.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0160c4] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-[#0052cc] active:scale-[0.98]"
          >
            <span>Back to Homepage</span>
            <ArrowRight weight="bold" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
