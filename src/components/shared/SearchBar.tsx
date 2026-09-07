"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const suggestions = [
  "Chase Sapphire Preferred $750 bonus...",
  "Capital One 360 $350 checking bonus...",
  "Amex Platinum 80,000 points offer...",
  "Citi checking account $300 promo...",
  "Best no annual fee cash back cards...",
  "Wells Fargo Active Cash $200 bonus...",
];

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused || inputValue.length > 0) return;

    const current = suggestions[suggestionIndex];

    if (phase === "typing") {
      if (charIndex < current.length) {
        const timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setPhase("deleting"), 1800);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === "deleting") {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        setPhase("typing");
        setSuggestionIndex((suggestionIndex + 1) % suggestions.length);
      }
    }
  }, [charIndex, phase, suggestionIndex, focused, inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (query) {
      router.push(`/credit-cards?q=${encodeURIComponent(query)}`);
    } else {
      router.push("/credit-cards");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative mt-6 w-full max-w-xl", className)}
    >
      <div
        className={cn(
          "flex items-center rounded-xl bg-white p-1.5 shadow-[0_2px_14px_rgba(15,23,42,0.08)] transition-all dark:bg-slate-900",
          focused
            ? "ring-2 ring-[#0160c4] dark:ring-[#38b6ff]"
            : "hover:shadow-[0_4px_18px_rgba(15,23,42,0.12)]",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center text-slate-400 dark:text-slate-500">
          <MagnifyingGlass weight="bold" className="h-4 w-4" />
        </div>

        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full bg-transparent py-1.5 pr-2 pl-1 text-sm font-medium text-slate-900 outline-none placeholder-transparent dark:text-white"
            placeholder="Search cards, banks, bonuses..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {!focused && inputValue.length === 0 && (
            <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center select-none text-sm text-slate-400 dark:text-slate-500">
              <span>{displayText}</span>
              <span className="ml-0.5 inline-block h-4 w-[1.5px] animate-pulse bg-slate-400 align-middle dark:bg-slate-500" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-1 rounded-lg bg-[#0160c4] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#0052cc] active:scale-[0.98]"
        >
          <span>Search</span>
          <ArrowRight weight="bold" className="h-3 w-3" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
