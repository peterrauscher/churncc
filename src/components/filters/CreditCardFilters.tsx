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
import { FilterOptions, SortOptions } from "@/types";
import { Funnel, ArrowsDownUp } from "@phosphor-icons/react";

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
  ) => {
    const values = currentValues ?? [];
    if (checked) {
      return [...values, value];
    }
    return values.filter((item) => item !== value);
  };

  const handleMultiSelectToggle = (
    key: "issuer" | "network",
    value: string,
    checked: boolean,
  ) => {
    const nextValues = getToggledValues(filters[key], value, checked);
    handleFilterChange({ [key]: nextValues.length ? nextValues : undefined });
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    const [field, direction] = value.split("-");
    onSortChange({ field, direction: direction as "asc" | "desc" });
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Funnel weight="light" className="h-5 w-5" />
          <h3 className="font-serif text-xl tracking-tight">Filters</h3>
        </div>
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-2">
          <ArrowsDownUp weight="light" className="h-5 w-5" />
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger id="sort" className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offerAmount-desc">Highest Bonus</SelectItem>
              <SelectItem value="offerAmount-asc">Lowest Bonus</SelectItem>
              <SelectItem value="annualFee-desc">Highest Annual Fee</SelectItem>
              <SelectItem value="annualFee-asc">Lowest Annual Fee</SelectItem>
              <SelectItem value="universalCashbackPercent-desc">
                Highest Cashback
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Checkbox
            id="noAnnualFee"
            checked={filters.annualFeeMax === 0}
            onCheckedChange={(checked) =>
              handleFilterChange({ annualFeeMax: checked ? 0 : undefined })
            }
          />
          <Label htmlFor="noAnnualFee">No Annual Fee</Label>

          <Checkbox
            id="businessCards"
            checked={filters.isBusiness}
            onCheckedChange={(checked) =>
              handleFilterChange({ isBusiness: checked ? true : undefined })
            }
          />
          <Label htmlFor="businessCards">Business Cards</Label>

          <Checkbox
            id="feeWaived"
            checked={filters.isAnnualFeeWaived}
            onCheckedChange={(checked) =>
              handleFilterChange({
                isAnnualFeeWaived: checked ? true : undefined,
              })
            }
          />
          <Label htmlFor="feeWaived">Fee Waived Year 1</Label>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="issuers">
          <AccordionTrigger>Card Issuers</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
                  <Label htmlFor={`issuer-${issuer}`}>
                    {issuer.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="networks">
          <AccordionTrigger>Card Networks</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
                  <Label htmlFor={`network-${network}`}>
                    {network.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="annual-fee">
          <AccordionTrigger>Annual Fee</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={[annualFee]}
                min={0}
                max={700}
                step={50}
                onValueChange={handleAnnualFeeChange}
              />
              <div className="flex items-center justify-between">
                <span>$0</span>
                <span className="font-medium">Max: ${annualFee}</span>
                <span>$700+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="offer-amount">
          <AccordionTrigger>Minimum Bonus Value</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 px-1">
              <Slider
                value={[minOfferAmount]}
                min={0}
                max={2000}
                step={100}
                onValueChange={handleMinOfferChange}
              />
              <div className="flex items-center justify-between">
                <span>$0</span>
                <span className="font-medium">Min: ${minOfferAmount}</span>
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
