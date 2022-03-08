import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { DIAL_COLOUR } from "src/constants";
import { BaseFilter, FilterOption, FilterType } from "src/filters";
import { DialColour } from "src/types";

export interface CategoryArrayFilter extends BaseFilter {
  dict: Record<string, string>;
  type: FilterType;
  filterOptions: FilterOption[];
}

const categoryArrayFilters: CategoryArrayFilter[] = [
  {
    name: "Dial colours",
    dict: DIAL_COLOUR,
    type: FilterType.Category,
    filterOptions: Object.values(DialColour),
    accessor: "manufacturer",
  },
];

export class StatefulCategoryArrayFilter {
  name: string;
  filterOptions: FilterOption[] = [];
  activeFilterOptions: FilterOption[] = [];
  accessor: string;
  dict: Record<string, string>;
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
    accessor: string;
    dict: Record<string, string>;
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

export const statefulCategoryArrayFilters = categoryArrayFilters.map(
  (filter) =>
    new StatefulCategoryArrayFilter({
      ...filter,
    })
);

export interface StatefulCategoryArrayFilterWithResults
  extends Omit<StatefulCategoryArrayFilter, "filterOptions"> {
  filterOptions: {
    option: FilterOption;
    results: number;
  }[];
}
