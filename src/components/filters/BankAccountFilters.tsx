import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Filter, ArrowDownWideNarrow } from "lucide-react";

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
    const currentInstitutions = filters.institutions || [];
    let newInstitutions: string[];

    if (checked) {
      newInstitutions = [...currentInstitutions, institution];
    } else {
      newInstitutions = currentInstitutions.filter(
        (i: string) => i !== institution,
      );
    }

    handleFilterChange({
      institutions: newInstitutions.length ? newInstitutions : undefined,
    });
  };

  const handleTypeToggle = (type: string, checked: boolean) => {
    const currentTypes = filters.accountTypes || [];
    let newTypes: string[];

    if (checked) {
      newTypes = [...currentTypes, type];
    } else {
      newTypes = currentTypes.filter((t: string) => t !== type);
    }

    handleFilterChange({
      accountTypes: newTypes.length ? newTypes : undefined,
    });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-");
    onSortChange({ field, direction: direction as "asc" | "desc" });
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <ArrowDownWideNarrow className="h-5 w-5" />
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offerAmount-desc">Highest Bonus</SelectItem>
              <SelectItem value="offerAmount-asc">Lowest Bonus</SelectItem>
              <SelectItem value="monthlyFee-desc">
                Highest Monthly Fee
              </SelectItem>
              <SelectItem value="monthlyFee-asc">Lowest Monthly Fee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Checkbox
            id="noMonthlyFee"
            checked={filters.noMonthlyFee}
            onCheckedChange={(checked) =>
              handleFilterChange({ noMonthlyFee: checked ? true : undefined })
            }
          />
          <Label htmlFor="noMonthlyFee">No Monthly Fee</Label>

          <Checkbox
            id="directDepositRequired"
            checked={filters.directDepositRequired}
            onCheckedChange={(checked) =>
              handleFilterChange({
                directDepositRequired: checked ? true : undefined,
              })
            }
          />
          <Label htmlFor="directDepositRequired">Direct Deposit Required</Label>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="institutions">
          <AccordionTrigger>Institutions</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {institutions.map((institution) => (
                <div key={institution} className="flex items-center space-x-2">
                  <Checkbox
                    id={`institution-${institution}`}
                    checked={filters.institutions?.includes(institution)}
                    onCheckedChange={(checked) =>
                      handleInstitutionToggle(institution, checked as boolean)
                    }
                  />
                  <Label htmlFor={`institution-${institution}`}>
                    {institution}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="account-types">
          <AccordionTrigger>Account Types</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3">
              {["CHECKING", "SAVINGS", "BROKERAGE", "HYBRID"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.accountTypes?.includes(type)}
                    onCheckedChange={(checked) =>
                      handleTypeToggle(type, checked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${type}`}>
                    {type.charAt(0) + type.slice(1).toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="bonus-amount">
          <AccordionTrigger>Minimum Bonus Amount</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={[minBonus]}
                min={0}
                max={1000}
                step={50}
                onValueChange={handleMinBonusChange}
              />
              <div className="flex items-center justify-between">
                <span>$0</span>
                <span className="font-medium">Min: ${minBonus}</span>
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
