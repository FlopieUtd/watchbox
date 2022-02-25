import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { MOVEMENT, CASE_MATERIAL, DIAL_COLOUR, BRAND } from "src/constants";
import { BaseFilter, FilterOption, FilterType } from "src/filters";
import { Movement, CaseMaterial, DialColour, Brand } from "src/types";

export interface CategoryFilter extends BaseFilter {
  dict: Record<string, string>;
  type: FilterType;
  filterOptions: FilterOption[];
}

const categoryFilters: CategoryFilter[] = [
  {
    name: "Brand",
    dict: BRAND,
    type: FilterType.Category,
    filterOptions: Object.values(Brand),
    accessor: "brand",
  },
  {
    name: "Movement",
    dict: MOVEMENT,
    type: FilterType.Category,
    filterOptions: Object.values(Movement),
    accessor: "movement.type",
  },
  {
    name: "Material",
    dict: CASE_MATERIAL,
    type: FilterType.Category,
    filterOptions: Object.values(CaseMaterial),
    accessor: "watchCase.material",
  },
  {
    name: "Dial colour",
    dict: DIAL_COLOUR,
    type: FilterType.Category,
    filterOptions: Object.values(DialColour),
    accessor: "dial.colour",
  },
];

export class StatefulCategoryFilter {
  name: string;
  filterOptions: FilterOption[] = [];
  activeFilterOptions: FilterOption[] = [];
  accessor: string;
  dict: Record<string, string>;
  type: FilterType.Category;

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
  }
}

export const statefulCategoryFilters = categoryFilters.map(
  (filter) =>
    new StatefulCategoryFilter({
      ...filter,
    })
);

export interface StatefulCategoryFilterWithResults
  extends Omit<StatefulCategoryFilter, "filterOptions"> {
  filterOptions: {
    option: FilterOption;
    results: number;
  }[];
}
