import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { CategoryFilterWatchAttribute, WATCH_ATTRIBUTES } from "src/constants";
import { BaseFilter, FilterOption, FilterType } from "src/filters";
import { Accessor } from "src/types";

export interface CategoryFilter extends BaseFilter {
  dict: Record<string, string> | null;
  type: FilterType;
  filterOptions: FilterOption[];
}

export class StatefulCategoryFilter {
  name: string;
  filterOptions: FilterOption[] = [];
  activeFilterOptions: FilterOption[] = [];
  accessor: string;
  dict: Record<string, string> | null;
  type: FilterType.Category;
  isActive = false;

  constructor({
    name,
    filterOptions,
    accessor,
    dict,
  }: {
    name: string;
    filterOptions: FilterOption[];
    accessor: Accessor;
    dict: Record<string, string> | null;
  }) {
    makeAutoObservable(this);
    this.name = name;
    this.filterOptions = filterOptions;
    this.activeFilterOptions = [];
    this.onFilter = this.onFilter.bind(this);
    this.onClear = this.onClear.bind(this);

    this.accessor = accessor;
    this.dict = dict;
  }

  onFilter(event: ChangeEvent) {
    const value = event.target.id;
    if (this.activeFilterOptions.includes(value)) {
      this.activeFilterOptions = this.activeFilterOptions.filter(
        (option) => option !== value
      );
    } else {
      this.activeFilterOptions = [...this.activeFilterOptions, value];
    }
    this.isActive = !!this.activeFilterOptions.length;
  }

  onClear() {
    this.activeFilterOptions = [];
    this.isActive = false;
  }
}

// @ts-ignore TS doesn't narrow down output type
const categoryFilters: CategoryFilterWatchAttribute[] = WATCH_ATTRIBUTES.filter(
  (filter) => filter.filterType === FilterType.Category
);

export const statefulCategoryFilters = categoryFilters.map(
  (filter) =>
    new StatefulCategoryFilter({
      ...filter,
      dict: filter.dict ?? null,
    })
);

export interface StatefulCategoryFilterWithResults
  extends Omit<StatefulCategoryFilter, "filterOptions"> {
  filterOptions: {
    option: FilterOption;
    results: number;
  }[];
}
