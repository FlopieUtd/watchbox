import { get } from "lodash";
import { StatefulCategoryFilter } from "src/filters/categoryFilters";
import { StatefulRangeFilter } from "src/filters/rangeFilters";
import { StatefulSearchFilter } from "src/filters/searchFilter";
import { Watch } from "src/types";

interface UseFilterResultsProps {
  watches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
  rangeFilters: StatefulRangeFilter[];
  searchFilter: StatefulSearchFilter;
}

export const useFilterResults = ({
  watches,
  categoryFilters,
}: UseFilterResultsProps) => {
  return categoryFilters.map((categoryFilter) => ({
    name: categoryFilter.name,
    filterOptions: categoryFilter.filterOptions.map((option) => ({
      value: option,
      results: watches.filter(
        (watch) => get(watch, categoryFilter.accessor) === option
      ).length,
    })),
  }));
};
