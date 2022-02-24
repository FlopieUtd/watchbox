import { CategoryFilter } from "src/filters/categoryFilters";
import { RangeFilter } from "src/filters/rangeFilters";

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
