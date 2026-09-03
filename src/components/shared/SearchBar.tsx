"use client";

import { useState, useEffect, useRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

const suggestions = [
  "Chase Sapphire Preferred bonus...",
  "Capital One 360 checking bonus...",
  "Amex Platinum welcome offer...",
  "Citi checking account bonus...",
  "Best no annual fee credit cards...",
  "Wells Fargo Everyday bonus...",
];

export function SearchBar() {
  const [displayText, setDisplayText] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused) return;

    const current = suggestions[suggestionIndex];

    if (phase === "typing") {
      if (charIndex < current.length) {
        const timeout = setTimeout(() => {
          setDisplayText(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 60);
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
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setPhase("typing");
        setSuggestionIndex((suggestionIndex + 1) % suggestions.length);
      }
    }
  }, [charIndex, phase, suggestionIndex, focused]);

  return (
    <div className="relative mt-8 max-w-xl">
      <div
        className="rounded-full bg-white/40 p-1.5 ring-1 ring-white/20"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex cursor-text items-center rounded-full bg-[#fbf6ec] px-2 py-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
          <MagnifyingGlass
            weight="light"
            className="ml-3 h-5 w-5 shrink-0 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent py-3 pl-3 pr-4 text-base text-foreground outline-none ring-0 placeholder-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Search cards, banks, bonuses..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          {!focused && (
            <div className="pointer-events-none absolute left-14 select-none text-base text-muted-foreground">
              {displayText}
              <span className="ml-px inline-block h-5 w-[2px] animate-pulse bg-muted-foreground/60 align-middle" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
