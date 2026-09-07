"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Funnel, X } from "@phosphor-icons/react";

interface BankAccountFilterState {
  institutions?: string[];
  accountTypes?: string[];
  minBonus?: number;
  noMonthlyFee?: boolean;
  directDepositRequired?: boolean;
}

interface BankAccountFiltersProps {
  onFilterChange: (filters: BankAccountFilterState) => void;
  onSortChange: (sort: { field: string; direction: "asc" | "desc" }) => void;
  institutions: string[];
}

const BankAccountFilters = ({
  onFilterChange,
  onSortChange,
  institutions,
}: BankAccountFiltersProps) => {
  const [filters, setFilters] = useState<BankAccountFilterState>({});
  const [minBonus, setMinBonus] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("offerAmount-desc");

  const handleFilterChange = (newFilters: Partial<BankAccountFilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleInstitutionToggle = (institution: string, checked: boolean) => {
    const current = filters.institutions || [];
    const updated = checked
      ? [...current, institution]
      : current.filter((i) => i !== institution);
    handleFilterChange({
      institutions: updated.length > 0 ? updated : undefined,
    });
  };

  const handleTypeToggle = (type: string, checked: boolean) => {
    const current = filters.accountTypes || [];
    const updated = checked
      ? [...current, type]
      : current.filter((t) => t !== type);
    handleFilterChange({
      accountTypes: updated.length > 0 ? updated : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-") as [string, "asc" | "desc"];
    onSortChange({ field, direction });
  };

  const handleMinBonusChange = (value: number[]) => {
    setMinBonus(value[0]);
    handleFilterChange({ minBonus: value[0] });
  };

  const clearFilters = () => {
    setFilters({});
    setMinBonus(0);
    onFilterChange({});
  };

  const hasActiveFilters =
    Boolean(filters.noMonthlyFee) ||
    Boolean(filters.directDepositRequired) ||
    Boolean(filters.institutions?.length) ||
    Boolean(filters.accountTypes?.length) ||
    Boolean(filters.minBonus);

  return (
    <div className="space-y-5">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#0160c4] dark:bg-blue-950 dark:text-[#38b6ff]">
            <Funnel weight="bold" className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Filter & Sort Bank Accounts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Narrow down by bonus amount, account type, and deposit criteria
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            <X weight="bold" className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Primary Controls: Sort + Quick Filter Chips */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Sort by:
          </span>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger
              id="sort"
              className="h-9 w-[190px] rounded-lg border-slate-200 text-xs font-semibold dark:border-slate-800"
            >
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offerAmount-desc">
                Highest Cash Bonus
              </SelectItem>
              <SelectItem value="offerAmount-asc">Lowest Cash Bonus</SelectItem>
              <SelectItem value="monthlyFee-asc">Lowest Monthly Fee</SelectItem>
              <SelectItem value="monthlyFee-desc">
                Highest Monthly Fee
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filter Checkboxes */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Checkbox
              id="noMonthlyFee"
              checked={filters.noMonthlyFee}
              onCheckedChange={(checked) =>
                handleFilterChange({ noMonthlyFee: checked ? true : undefined })
              }
            />
            <span>No Monthly Fee</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Checkbox
              id="directDepositRequired"
              checked={filters.directDepositRequired}
              onCheckedChange={(checked) =>
                handleFilterChange({
                  directDepositRequired: checked ? true : undefined,
                })
              }
            />
            <span>Direct Deposit Required</span>
          </label>
        </div>
      </div>

      {/* Accordion Detailed Filter Panels */}
      <Accordion
        type="single"
        collapsible
        className="w-full border-t border-slate-100 pt-2 dark:border-slate-800"
      >
        <AccordionItem
          value="institutions"
          className="border-b border-slate-100 dark:border-slate-800"
        >
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Banks & Institutions (
            {filters.institutions?.length
              ? `${filters.institutions.length} selected`
              : "All"}
            )
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4">
              {institutions.map((institution) => (
                <div key={institution} className="flex items-center space-x-2">
                  <Checkbox
                    id={`institution-${institution}`}
                    checked={filters.institutions?.includes(institution)}
                    onCheckedChange={(checked) =>
                      handleInstitutionToggle(institution, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`institution-${institution}`}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {institution}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="account-types"
          className="border-b border-slate-100 dark:border-slate-800"
        >
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Account Types (
            {filters.accountTypes?.length
              ? `${filters.accountTypes.length} selected`
              : "All"}
            )
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-1 sm:grid-cols-4">
              {["CHECKING", "SAVINGS", "BROKERAGE", "HYBRID"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.accountTypes?.includes(type)}
                    onCheckedChange={(checked) =>
                      handleTypeToggle(type, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`type-${type}`}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bonus-amount" className="border-b-0">
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Minimum Cash Bonus: ${minBonus}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 px-1 pt-2">
              <Slider
                value={[minBonus]}
                min={0}
                max={1000}
                step={50}
                onValueChange={handleMinBonusChange}
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>$0</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  At least ${minBonus}
                </span>
                <span>$1,000+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BankAccountFilters;
