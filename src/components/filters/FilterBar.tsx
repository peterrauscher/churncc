"use client";

import { CaretDown, Check, X } from "@phosphor-icons/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const filterPillBase =
  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-semibold transition-colors";

function filterPillClass(active: boolean) {
  return cn(
    filterPillBase,
    active
      ? "border-primary bg-primary text-primary-foreground"
      : "border-border bg-background text-foreground hover:bg-muted",
  );
}

export const sortPillClass = cn(
  filterPillClass(false),
  "w-auto shadow-none [&>svg]:h-3 [&>svg]:w-3",
);

export function FilterBar({
  children,
  trailing,
}: {
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {children}
      {trailing ? (
        <div className="flex items-center gap-2 sm:ml-auto">{trailing}</div>
      ) : null}
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
      className={filterPillClass(active)}
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
        <button type="button" className={filterPillClass(Boolean(active))}>
          <span>{label}</span>
          {count ? (
            <span
              className={cn(
                "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
                active
                  ? "bg-primary-foreground/20 text-primary-foreground"
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
      className="inline-flex h-8 items-center gap-1 px-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
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
