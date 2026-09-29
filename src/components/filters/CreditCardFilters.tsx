"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions, SortOptions } from "@/types";
import {
  FilterBar,
  FilterCheckboxList,
  FilterClearButton,
  FilterLabeledControl,
  FilterMenuPill,
  FilterTogglePill,
  filterControlClass,
} from "@/components/filters/FilterBar";

interface CreditCardFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
  issuers: string[];
  initialFilters?: FilterOptions;
}

type ExclusivePreset = "all" | "no-fee" | "rewards" | "travel" | "cashback";

const CreditCardFilters = ({
  onFilterChange,
  onSortChange,
  issuers,
  initialFilters = {},
}: CreditCardFiltersProps) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [annualFee, setAnnualFee] = useState<number>(
    initialFilters.annualFeeMax ?? 700,
  );
  const [minOfferAmount, setMinOfferAmount] = useState<number>(
    initialFilters.offerAmountMin ?? 0,
  );
  const [sortOption, setSortOption] = useState<string>("offerAmount-desc");

  const commitFilters = (updated: FilterOptions) => {
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters: FilterOptions = { ...filters, ...newFilters };
    (Object.keys(newFilters) as (keyof FilterOptions)[]).forEach((key) => {
      if (newFilters[key] === undefined) {
        delete updatedFilters[key];
      }
    });
    commitFilters(updatedFilters);
  };

  const handleIssuerToggle = (value: string, checked: boolean) => {
    const current = filters.issuer ?? [];
    const updated = checked
      ? [...current, value]
      : current.filter((item) => item !== value);
    handleFilterChange({
      issuer: updated.length > 0 ? updated : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-") as [string, "asc" | "desc"];
    onSortChange({ field, direction });
  };

  const handleAnnualFeeChange = (value: number[]) => {
    setAnnualFee(value[0]);
    handleFilterChange({
      annualFeeMax: value[0] === 700 ? undefined : value[0],
    });
  };

  const handleMinOfferChange = (value: number[]) => {
    setMinOfferAmount(value[0]);
    handleFilterChange({
      offerAmountMin: value[0] === 0 ? undefined : value[0],
    });
  };

  const exclusivePreset = (): ExclusivePreset => {
    if (filters.annualFeeMax === 0 && !filters.categories?.length) {
      return "no-fee";
    }
    const category = filters.categories?.[0];
    if (
      category === "rewards" ||
      category === "travel" ||
      category === "cashback"
    ) {
      return category;
    }
    return "all";
  };

  const selectPreset = (preset: ExclusivePreset) => {
    if (preset === "all") {
      setAnnualFee(700);
      handleFilterChange({ categories: undefined, annualFeeMax: undefined });
      return;
    }
    if (preset === "no-fee") {
      setAnnualFee(0);
      handleFilterChange({ categories: undefined, annualFeeMax: 0 });
      return;
    }
    if (filters.annualFeeMax === 0) {
      setAnnualFee(700);
    }
    handleFilterChange({
      categories: [preset],
      annualFeeMax:
        filters.annualFeeMax === 0 ? undefined : filters.annualFeeMax,
    });
  };

  const clearFilters = () => {
    setAnnualFee(700);
    setMinOfferAmount(0);
    commitFilters({});
  };

  const hasActiveFilters =
    Boolean(filters.annualFeeMax !== undefined) ||
    Boolean(filters.isBusiness) ||
    Boolean(filters.isAnnualFeeWaived) ||
    Boolean(filters.issuer?.length) ||
    Boolean(filters.offerAmountMin) ||
    Boolean(filters.categories?.length);

  const preset = exclusivePreset();
  const annualFeeActive =
    filters.annualFeeMax !== undefined && filters.annualFeeMax !== 0;
  const annualFeeLabel = annualFeeActive
    ? `Fee ≤ $${filters.annualFeeMax}`
    : "All fees";
  const bonusLabel = filters.offerAmountMin
    ? `Bonus ≥ $${filters.offerAmountMin}`
    : "Any bonus";

  return (
    <FilterBar
      chips={
        <>
          <FilterTogglePill
            active={preset === "all"}
            onClick={() => selectPreset("all")}
          >
            All cards
          </FilterTogglePill>
          <FilterTogglePill
            active={preset === "no-fee"}
            onClick={() => selectPreset("no-fee")}
          >
            No annual fee
          </FilterTogglePill>
          <FilterTogglePill
            active={preset === "rewards"}
            onClick={() => selectPreset("rewards")}
          >
            Rewards
          </FilterTogglePill>
          <FilterTogglePill
            active={preset === "travel"}
            onClick={() => selectPreset("travel")}
          >
            Travel
          </FilterTogglePill>
          <FilterTogglePill
            active={preset === "cashback"}
            onClick={() => selectPreset("cashback")}
          >
            Cash back
          </FilterTogglePill>
          <FilterTogglePill
            active={Boolean(filters.isBusiness)}
            onClick={() =>
              handleFilterChange({
                isBusiness: filters.isBusiness ? undefined : true,
              })
            }
          >
            Business
          </FilterTogglePill>
          <FilterTogglePill
            active={Boolean(filters.isAnnualFeeWaived)}
            onClick={() =>
              handleFilterChange({
                isAnnualFeeWaived: filters.isAnnualFeeWaived ? undefined : true,
              })
            }
          >
            Fee waived yr 1
          </FilterTogglePill>
        </>
      }
      controls={
        <>
          <FilterLabeledControl label="Issuers">
            <FilterMenuPill
              label={
                filters.issuer?.length === 1
                  ? filters.issuer[0].replaceAll("_", " ")
                  : "All card issuers"
              }
              active={Boolean(filters.issuer?.length)}
              count={filters.issuer?.length}
            >
              <FilterCheckboxList
                options={issuers}
                selected={filters.issuer}
                onToggle={(value, checked) =>
                  handleIssuerToggle(value, checked)
                }
                formatLabel={(value) => value.replaceAll("_", " ")}
              />
            </FilterMenuPill>
          </FilterLabeledControl>
          <FilterLabeledControl label="Annual fee">
            <FilterMenuPill label={annualFeeLabel} active={annualFeeActive}>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Max annual fee
                </p>
                <Slider
                  value={[annualFee]}
                  min={0}
                  max={700}
                  step={50}
                  onValueChange={handleAnnualFeeChange}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span className="font-semibold text-foreground">
                    ${annualFee}
                  </span>
                  <span>$700+</span>
                </div>
              </div>
            </FilterMenuPill>
          </FilterLabeledControl>
          <FilterLabeledControl label="Min value">
            <FilterMenuPill
              label={bonusLabel}
              active={Boolean(filters.offerAmountMin)}
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Minimum bonus value, cash and points converted to USD
                </p>
                <Slider
                  value={[minOfferAmount]}
                  min={0}
                  max={2000}
                  step={100}
                  onValueChange={handleMinOfferChange}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span className="font-semibold text-foreground">
                    ${minOfferAmount}
                  </span>
                  <span>$2,000+</span>
                </div>
              </div>
            </FilterMenuPill>
          </FilterLabeledControl>
          <FilterLabeledControl label="Sort by" htmlFor="sort">
            <Select value={sortOption} onValueChange={handleSortChange}>
              <SelectTrigger id="sort" className={filterControlClass}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="offerAmount-desc">
                  Highest Bonus Value
                </SelectItem>
                <SelectItem value="offerAmount-asc">
                  Lowest Bonus Value
                </SelectItem>
                <SelectItem value="annualFee-asc">Lowest Annual Fee</SelectItem>
                <SelectItem value="annualFee-desc">
                  Highest Annual Fee
                </SelectItem>
                <SelectItem value="universalCashbackPercent-desc">
                  Highest Base Cashback
                </SelectItem>
              </SelectContent>
            </Select>
          </FilterLabeledControl>
        </>
      }
      trailing={
        hasActiveFilters ? <FilterClearButton onClick={clearFilters} /> : null
      }
    />
  );
};

export default CreditCardFilters;
