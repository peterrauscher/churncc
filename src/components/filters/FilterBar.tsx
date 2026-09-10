"use client";

import { CaretDown, Check, X } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const filterChipBase =
  "inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-md border-2 px-4 text-sm font-bold whitespace-nowrap transition-colors";

function filterChipClass(active: boolean) {
  return cn(
    filterChipBase,
    active
      ? "border-primary bg-accent text-foreground hover:bg-accent"
      : "border-muted-foreground/40 bg-background text-foreground hover:border-primary hover:bg-accent",
  );
}

export const filterControlClass =
  "h-12 w-auto min-w-[11rem] rounded-md border border-foreground/50 bg-background px-3 text-sm font-medium shadow-none [&>svg]:h-4 [&>svg]:w-4";

export function FilterBar({
  chips,
  controls,
  trailing,
}: {
  chips: React.ReactNode;
  controls?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Filter by</p>
        <div className="flex flex-wrap items-center gap-2">{chips}</div>
      </div>
      {controls || trailing ? (
        <div className="flex flex-wrap items-end gap-3">
          {controls}
          {trailing ? (
            <div className="flex items-end gap-2 sm:ml-auto">{trailing}</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function FilterLabeledControl({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-[10rem] flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-bold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function FilterTogglePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={filterChipClass(active)}
    >
      {children}
    </button>
  );
}

export function FilterMenuPill({
  label,
  active,
  count,
  children,
  contentClassName,
}: {
  label: string;
  active?: boolean;
  count?: number;
  children: React.ReactNode;
  contentClassName?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={filterChipClass(Boolean(active))}>
          <span>{label}</span>
          {count ? (
            <span
              className={cn(
                "flex h-4 min-w-4 items-center justify-center rounded-sm px-1 text-[10px] font-bold",
                active
                  ? "bg-primary/15 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {count}
            </span>
          ) : null}
          <CaretDown weight="bold" className="h-3 w-3 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className={cn("w-72 p-3", contentClassName)}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export function FilterClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-12 items-center gap-1 px-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
    >
      <X weight="bold" className="h-3.5 w-3.5" />
      Clear
    </button>
  );
}

export function FilterCheckboxList({
  options,
  selected,
  onToggle,
  formatLabel,
}: {
  options: string[];
  selected?: string[];
  onToggle: (value: string, checked: boolean) => void;
  formatLabel?: (value: string) => string;
}) {
  return (
    <div className="flex max-h-64 flex-col gap-0.5 overflow-y-auto">
      {options.map((option) => {
        const checked = selected?.includes(option) ?? false;
        const label = formatLabel ? formatLabel(option) : option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option, !checked)}
            className={cn(
              "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm hover:bg-muted",
              checked ? "font-semibold text-foreground" : "font-medium",
            )}
          >
            <span>{label}</span>
            {checked ? (
              <Check weight="bold" className="h-3.5 w-3.5 text-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
