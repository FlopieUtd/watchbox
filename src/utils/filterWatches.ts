import { get } from "lodash";
import { MANUFACTURER } from "src/constants";
import { CategoryFilterState } from "src/state/categoryFiltersState";
import { SearchFilterState } from "src/state/searchFilterState";
import { FilterOperator, Watch } from "src/types";
import { normalizeString } from "src/utils/normalizeString";

interface FilterWatches {
  watches: Watch[];
  searchFilter: SearchFilterState;
  categoryFilters: CategoryFilterState[];
}

export const filterWatches = ({
  watches,
  searchFilter,
  categoryFilters,
}: FilterWatches) => {
  let result = watches;

  // Search filter
  result = result.filter(
    (watch) =>
      normalizeString(MANUFACTURER[watch.manufacturer]).includes(
        searchFilter.searchString
      ) ||
      normalizeString(watch.model).includes(searchFilter.searchString) ||
      normalizeString(watch.reference).includes(searchFilter.searchString)
  );

  // Category filters
  categoryFilters
    .filter((categoryFilter) => categoryFilter.activeFilterOptions.length)
    .forEach((categoryFilter) => {
      result = result.filter((watch) => {
        const accessorResult = get(watch, categoryFilter.accessor);
        console.log(accessorResult);

        if (accessorResult === null) {
          return false;
        }
        if (typeof accessorResult === "string") {
          return categoryFilter.activeFilterOptions.includes(accessorResult);
        } else if (typeof accessorResult === "number") {
          return categoryFilter.activeFilterOptions.includes(
            Math.floor(accessorResult).toString()
          );
        } else if (typeof accessorResult === "object") {
          console.log("bingo");
          return categoryFilter.operator === FilterOperator.Or
            ? categoryFilter.activeFilterOptions.some((item) =>
                accessorResult.includes(item)
              )
            : categoryFilter.activeFilterOptions.every((item) =>
                accessorResult.includes(item)
              );
        } else {
          throw new Error("Unexpected accessor result");
        }
      });
    });

  return result;
};
