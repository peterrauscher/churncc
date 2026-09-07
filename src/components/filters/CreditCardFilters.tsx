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
import { FilterOptions, SortOptions } from "@/types";
import { Funnel, X } from "@phosphor-icons/react";

interface CreditCardFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
  issuers: string[];
  networks: string[];
}

const CreditCardFilters = ({
  onFilterChange,
  onSortChange,
  issuers,
  networks,
}: CreditCardFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [annualFee, setAnnualFee] = useState<number>(700);
  const [minOfferAmount, setMinOfferAmount] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("offerAmount-desc");

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const getToggledValues = (
    currentValues: string[] | undefined,
    value: string,
    checked: boolean,
  ): string[] => {
    const values = currentValues ? [...currentValues] : [];
    if (checked) {
      return [...values, value];
    }
    return values.filter((v) => v !== value);
  };

  const handleMultiSelectToggle = (
    key: "issuer" | "network",
    value: string,
    checked: boolean,
  ) => {
    const updatedValues = getToggledValues(filters[key], value, checked);
    handleFilterChange({
      [key]: updatedValues.length > 0 ? updatedValues : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-") as [string, "asc" | "desc"];
    onSortChange({ field, direction });
  };

  const handleAnnualFeeChange = (value: number[]) => {
    setAnnualFee(value[0]);
    handleFilterChange({ annualFeeMax: value[0] });
  };

  const handleMinOfferChange = (value: number[]) => {
    setMinOfferAmount(value[0]);
    handleFilterChange({ offerAmountMin: value[0] });
  };

  const clearFilters = () => {
    setFilters({});
    setAnnualFee(700);
    setMinOfferAmount(0);
    onFilterChange({});
  };

  const hasActiveFilters =
    Boolean(filters.annualFeeMax !== undefined) ||
    Boolean(filters.isBusiness) ||
    Boolean(filters.isAnnualFeeWaived) ||
    Boolean(filters.issuer?.length) ||
    Boolean(filters.network?.length) ||
    Boolean(filters.offerAmountMin);

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
              Filter & Sort Cards
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Narrow down by bonus value, issuer, fees, and perks
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
                Highest Welcome Bonus
              </SelectItem>
              <SelectItem value="offerAmount-asc">
                Lowest Welcome Bonus
              </SelectItem>
              <SelectItem value="annualFee-asc">Lowest Annual Fee</SelectItem>
              <SelectItem value="annualFee-desc">Highest Annual Fee</SelectItem>
              <SelectItem value="universalCashbackPercent-desc">
                Highest Base Cashback
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Filter Checkboxes */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Checkbox
              id="noAnnualFee"
              checked={filters.annualFeeMax === 0}
              onCheckedChange={(checked) =>
                handleFilterChange({ annualFeeMax: checked ? 0 : undefined })
              }
            />
            <span>No Annual Fee</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Checkbox
              id="businessCards"
              checked={filters.isBusiness}
              onCheckedChange={(checked) =>
                handleFilterChange({ isBusiness: checked ? true : undefined })
              }
            />
            <span>Business Cards</span>
          </label>

          <label className="flex cursor-pointer items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
            <Checkbox
              id="feeWaived"
              checked={filters.isAnnualFeeWaived}
              onCheckedChange={(checked) =>
                handleFilterChange({
                  isAnnualFeeWaived: checked ? true : undefined,
                })
              }
            />
            <span>Fee Waived Yr 1</span>
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
          value="issuers"
          className="border-b border-slate-100 dark:border-slate-800"
        >
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Card Issuers (
            {filters.issuer?.length
              ? `${filters.issuer.length} selected`
              : "All"}
            )
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4">
              {issuers.map((issuer) => (
                <div key={issuer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`issuer-${issuer}`}
                    checked={filters.issuer?.includes(issuer)}
                    onCheckedChange={(checked) =>
                      handleMultiSelectToggle(
                        "issuer",
                        issuer,
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor={`issuer-${issuer}`}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {issuer.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="networks"
          className="border-b border-slate-100 dark:border-slate-800"
        >
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Card Networks (
            {filters.network?.length
              ? `${filters.network.length} selected`
              : "All"}
            )
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 pt-1 md:grid-cols-3 lg:grid-cols-4">
              {networks.map((network) => (
                <div key={network} className="flex items-center space-x-2">
                  <Checkbox
                    id={`network-${network}`}
                    checked={filters.network?.includes(network)}
                    onCheckedChange={(checked) =>
                      handleMultiSelectToggle(
                        "network",
                        network,
                        checked as boolean,
                      )
                    }
                  />
                  <Label
                    htmlFor={`network-${network}`}
                    className="text-xs font-medium cursor-pointer"
                  >
                    {network.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="annual-fee"
          className="border-b border-slate-100 dark:border-slate-800"
        >
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Max Annual Fee: ${annualFee}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 px-1 pt-2">
              <Slider
                value={[annualFee]}
                min={0}
                max={700}
                step={50}
                onValueChange={handleAnnualFeeChange}
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>$0 (Free only)</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  Cap at ${annualFee}
                </span>
                <span>$700+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offer-amount" className="border-b-0">
          <AccordionTrigger className="text-xs font-bold text-slate-900 uppercase hover:no-underline dark:text-white">
            Minimum Bonus Value: ${minOfferAmount}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 px-1 pt-2">
              <Slider
                value={[minOfferAmount]}
                min={0}
                max={2000}
                step={100}
                onValueChange={handleMinOfferChange}
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>$0</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  At least ${minOfferAmount}
                </span>
                <span>$2,000+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreditCardFilters;
