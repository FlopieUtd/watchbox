import { get } from "lodash";
import { CategoryFilterState } from "src/state/categoryFiltersState";
import { SearchFilterState } from "src/state/searchFilterState";
import { Watch } from "src/types";

interface GetFilterResults {
  watches: Watch[];
  categoryFilters: CategoryFilterState[];
  searchFilter: SearchFilterState;
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

        if (accessorResult === null) {
          return false;
        }

        if (typeof accessorResult === "number") {
          return Math.floor(accessorResult) === option;
        }

        if (typeof accessorResult === "string") {
          return accessorResult === option;
        }

        if (typeof accessorResult === "object") {
          return accessorResult.includes(option);
        }

        throw new Error("Unknown accessor result");
      }).length,
    })),
  }));
};
