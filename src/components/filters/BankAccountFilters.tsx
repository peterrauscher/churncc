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
import {
  FilterBar,
  FilterCheckboxList,
  FilterClearButton,
  FilterLabeledControl,
  FilterMenuPill,
  FilterTogglePill,
  filterControlClass,
} from "@/components/filters/FilterBar";

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

const ACCOUNT_TYPES = ["CHECKING", "SAVINGS", "BROKERAGE", "HYBRID"];

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
    (Object.keys(newFilters) as (keyof BankAccountFilterState)[]).forEach(
      (key) => {
        if (newFilters[key] === undefined) {
          delete updatedFilters[key];
        }
      },
    );
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleListToggle = (
    key: "institutions" | "accountTypes",
    value: string,
    checked: boolean,
  ) => {
    const current = filters[key] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((item) => item !== value);
    handleFilterChange({
      [key]: updated.length > 0 ? updated : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-") as [string, "asc" | "desc"];
    onSortChange({ field, direction });
  };

  const handleMinBonusChange = (value: number[]) => {
    setMinBonus(value[0]);
    handleFilterChange({ minBonus: value[0] === 0 ? undefined : value[0] });
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

  const allAccountsActive = !hasActiveFilters;
  const bonusLabel = filters.minBonus
    ? `Bonus ≥ $${filters.minBonus}`
    : "Any bonus";

  return (
    <FilterBar
      chips={
        <>
          <FilterTogglePill active={allAccountsActive} onClick={clearFilters}>
            All accounts
          </FilterTogglePill>
          <FilterTogglePill
            active={Boolean(filters.noMonthlyFee)}
            onClick={() =>
              handleFilterChange({
                noMonthlyFee: filters.noMonthlyFee ? undefined : true,
              })
            }
          >
            No monthly fee
          </FilterTogglePill>
          <FilterTogglePill
            active={Boolean(filters.directDepositRequired)}
            onClick={() =>
              handleFilterChange({
                directDepositRequired: filters.directDepositRequired
                  ? undefined
                  : true,
              })
            }
          >
            Direct deposit required
          </FilterTogglePill>
        </>
      }
      controls={
        <>
          <FilterLabeledControl label="Institution">
            <FilterMenuPill
              label={
                filters.institutions?.length === 1
                  ? filters.institutions[0]
                  : "All institutions"
              }
              active={Boolean(filters.institutions?.length)}
              count={filters.institutions?.length}
            >
              <FilterCheckboxList
                options={institutions}
                selected={filters.institutions}
                onToggle={(value, checked) =>
                  handleListToggle("institutions", value, checked)
                }
              />
            </FilterMenuPill>
          </FilterLabeledControl>
          <FilterLabeledControl label="Account type">
            <FilterMenuPill
              label={
                filters.accountTypes?.length === 1
                  ? filters.accountTypes[0].charAt(0) +
                    filters.accountTypes[0].slice(1).toLowerCase()
                  : "All types"
              }
              active={Boolean(filters.accountTypes?.length)}
              count={filters.accountTypes?.length}
            >
              <FilterCheckboxList
                options={ACCOUNT_TYPES}
                selected={filters.accountTypes}
                onToggle={(value, checked) =>
                  handleListToggle("accountTypes", value, checked)
                }
                formatLabel={(value) =>
                  value.charAt(0) + value.slice(1).toLowerCase()
                }
              />
            </FilterMenuPill>
          </FilterLabeledControl>
          <FilterLabeledControl label="Min bonus">
            <FilterMenuPill
              label={bonusLabel}
              active={Boolean(filters.minBonus)}
            >
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Minimum cash bonus
                </p>
                <Slider
                  value={[minBonus]}
                  min={0}
                  max={1000}
                  step={50}
                  onValueChange={handleMinBonusChange}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span className="font-semibold text-foreground">
                    ${minBonus}
                  </span>
                  <span>$1,000+</span>
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
                  Highest Cash Bonus
                </SelectItem>
                <SelectItem value="offerAmount-asc">
                  Lowest Cash Bonus
                </SelectItem>
                <SelectItem value="monthlyFee-asc">
                  Lowest Monthly Fee
                </SelectItem>
                <SelectItem value="monthlyFee-desc">
                  Highest Monthly Fee
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

export default BankAccountFilters;
