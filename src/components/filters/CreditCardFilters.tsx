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
  FilterMenuPill,
  FilterTogglePill,
  sortPillClass,
} from "@/components/filters/FilterBar";

interface CreditCardFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOptions) => void;
  issuers: string[];
}

const CreditCardFilters = ({
  onFilterChange,
  onSortChange,
  issuers,
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
    Boolean(filters.offerAmountMin);

  const annualFeeActive =
    filters.annualFeeMax !== undefined && filters.annualFeeMax !== 0;
  const annualFeeLabel = annualFeeActive
    ? `Fee ≤ $${filters.annualFeeMax}`
    : "Annual fee";

  const bonusLabel = filters.offerAmountMin
    ? `Bonus ≥ $${filters.offerAmountMin}`
    : "Min bonus";

  return (
    <FilterBar
      trailing={
        <>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className={sortPillClass}>
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
          {hasActiveFilters ? (
            <FilterClearButton onClick={clearFilters} />
          ) : null}
        </>
      }
    >
      <FilterTogglePill
        active={filters.annualFeeMax === 0}
        onClick={() =>
          handleFilterChange({
            annualFeeMax: filters.annualFeeMax === 0 ? undefined : 0,
          })
        }
      >
        No annual fee
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

      <FilterMenuPill
        label={
          filters.issuer?.length === 1
            ? filters.issuer[0].replaceAll("_", " ")
            : "Issuer"
        }
        active={Boolean(filters.issuer?.length)}
        count={filters.issuer?.length}
      >
        <FilterCheckboxList
          options={issuers}
          selected={filters.issuer}
          onToggle={(value, checked) => handleIssuerToggle(value, checked)}
          formatLabel={(value) => value.replaceAll("_", " ")}
        />
      </FilterMenuPill>

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
            <span className="font-semibold text-foreground">${annualFee}</span>
            <span>$700+</span>
          </div>
        </div>
      </FilterMenuPill>

      <FilterMenuPill
        label={bonusLabel}
        active={Boolean(filters.offerAmountMin)}
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">
            Minimum bonus value
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
    </FilterBar>
  );
};

export default CreditCardFilters;
