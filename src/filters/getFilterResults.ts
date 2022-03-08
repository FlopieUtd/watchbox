import { get } from "lodash";
import { StatefulCategoryFilter } from "src/filters/categoryFilters";
import { StatefulRangeFilter } from "src/filters/rangeFilters";
import { StatefulSearchFilter } from "src/filters/searchFilter";
import { Watch } from "src/types";

interface GetFilterResults {
  watches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
  rangeFilters: StatefulRangeFilter[];
  searchFilter: StatefulSearchFilter;
}

export const getFilterResults = ({
  watches,
  categoryFilters,
}: GetFilterResults) => {
  return categoryFilters.map((categoryFilter) => ({
    name: categoryFilter.name,
    filterOptions: categoryFilter.filterOptions.map((option) => ({
      value: option,
      results: watches.filter((watch) => {
        const accessorResult = get(watch, categoryFilter.accessor);
        return typeof accessorResult === "string"
          ? accessorResult === option
          : accessorResult.includes(option);
      }).length,
    })),
  }));
};
