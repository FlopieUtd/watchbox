import { CategoryFilter } from "src/state/categoryFilters";

export type FilterOption = string | number;

export enum FilterType {
  Category = "CATEGORY",
  Search = "SEARCH",
  None = "NONE",
}

export interface BaseFilter {
  name: string;
  accessor: string;
  type: FilterType;
}

export type AnyFilter = CategoryFilter;
