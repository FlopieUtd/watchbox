import { get } from "lodash";
import { StatefulCategoryFilter } from "src/state/categoryFilters";
import { StatefulSearchFilter } from "src/state/searchFilter";
import { Watch } from "src/types";

interface GetFilterResults {
  watches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
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
