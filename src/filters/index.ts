import { get } from "lodash";
import {
  CategoryFilter,
  StatefulCategoryFilter,
} from "src/filters/categoryFilters";
import { RangeFilter, StatefulRangeFilter } from "src/filters/rangeFilters";
import { StatefulSearchFilter } from "src/filters/searchFilter";
import { Watch } from "src/types";
import { normalizeString } from "src/utils/normalizeString";

export type FilterOption = string | number;

export enum FilterType {
  Category = "CATEGORY",
  Range = "RANGE",
  Search = "SEARCH",
}

export interface BaseFilter {
  name: string;
  accessor: string;
  type: FilterType;
}

export type AnyFilter = CategoryFilter | RangeFilter;

interface FilterWatchesProps {
  watches: Watch[];
  searchFilter: StatefulSearchFilter;
  categoryFilters: StatefulCategoryFilter[];
  rangeFilters: StatefulRangeFilter[];
}

export const filterWatches = ({
  watches,
  searchFilter,
  categoryFilters,
  rangeFilters,
}: FilterWatchesProps) => {
  let result = watches;

  // Search filter
  result = result.filter(
    (watch) =>
      normalizeString(watch.brand).includes(searchFilter.searchString) ||
      normalizeString(watch.model).includes(searchFilter.searchString) ||
      normalizeString(watch.reference).includes(searchFilter.searchString)
  );

  // Category filters
  categoryFilters
    .filter((categoryFilter) => categoryFilter.activeFilterOptions.length)
    .forEach((categoryFilter) => {
      result = result.filter((watch) =>
        categoryFilter.activeFilterOptions.includes(
          get(watch, categoryFilter.accessor)
        )
      );
    });

  // Range filters
  rangeFilters
    .filter(
      (rangeFilter) =>
        !(
          rangeFilter.value[0] === rangeFilter.range[0] &&
          rangeFilter.value[1] === rangeFilter.range[1]
        )
    )
    .forEach((rangeFilter) => {
      result = result.filter(
        (watch) =>
          get(watch, rangeFilter.accessor) >= rangeFilter.value[0] &&
          get(watch, rangeFilter.accessor) <= rangeFilter.value[1]
      );
    });

  return result;
};
