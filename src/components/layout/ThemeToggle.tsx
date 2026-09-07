"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9 w-9 rounded-lg border border-border/80 bg-background/50",
          className,
        )}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-blue",
        className,
      )}
    >
      {isDark ? (
        <Sun weight="bold" className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon weight="bold" className="h-4 w-4 text-slate-700" />
      )}
    </button>
  );
}
