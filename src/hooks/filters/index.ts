import { StatefulCategoryFilter } from "src/filters/categoryFilters";
import { StatefulRangeFilter } from "src/filters/rangeFilters";
import { StatefulSearchFilter } from "src/filters/searchFilter";
import { useCategoryFilters } from "src/hooks/filters/useCategoryFilters";
import { useRangeFilters } from "src/hooks/filters/useRangeFilters";
import { useSearchFilter } from "src/hooks/filters/useSearchFilter";
import { Watch } from "src/types";

interface UseFilterProps {
  watches: Watch[];
  searchFilter: StatefulSearchFilter;
  categoryFilters: StatefulCategoryFilter[];
  rangeFilters: StatefulRangeFilter[];
}

export const useFilters = ({
  watches,
  searchFilter,
  categoryFilters,
  rangeFilters,
}: UseFilterProps) => {
  const searchFilterResult = useSearchFilter({
    watches,
    searchFilter,
  });
  const categoryFiltersResult = useCategoryFilters({
    watches: searchFilterResult,
    categoryFilters,
  });
  const rangeFiltersResult = useRangeFilters({
    watches: categoryFiltersResult,
    rangeFilters,
  });

  return { filteredWatches: rangeFiltersResult };
};
