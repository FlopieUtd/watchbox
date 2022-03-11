import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import {
  MOVEMENT,
  CASE_MATERIAL,
  DIAL_COLOUR,
  MANUFACTURER,
  HOUR_MARKERS,
  COMPLICATION,
  CRYSTAL_MATERIAL,
  CRYSTAL_SHAPE,
  VPH,
} from "src/constants";
import { BaseFilter, FilterOption, FilterType } from "src/filters";
import {
  MovementType,
  CaseMaterial,
  DialColour,
  WatchManufacturer,
  HourMarkers,
  Complication,
  CrystalMaterial,
  CrystalShape,
} from "src/types";

export interface CategoryFilter extends BaseFilter {
  dict: Record<string, string> | null;
  type: FilterType;
  filterOptions: FilterOption[];
}

const categoryFilters: CategoryFilter[] = [
  {
    name: "Manufacturer",
    dict: MANUFACTURER,
    type: FilterType.Category,
    filterOptions: Object.values(WatchManufacturer),
    accessor: "manufacturer",
  },
  {
    name: "Movement",
    dict: MOVEMENT,
    type: FilterType.Category,
    filterOptions: Object.values(MovementType),
    accessor: "caliber.type",
  },
  {
    name: "Case material",
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
  {
    name: "Hour markers",
    dict: HOUR_MARKERS,
    type: FilterType.Category,
    filterOptions: Object.values(HourMarkers),
    accessor: "dial.hourMarkers",
  },
  {
    name: "Complications",
    dict: COMPLICATION,
    type: FilterType.Category,
    filterOptions: Object.values(Complication),
    accessor: "caliber.functions",
  },
  {
    name: "Crystal material",
    dict: CRYSTAL_MATERIAL,
    type: FilterType.Category,
    filterOptions: Object.values(CrystalMaterial),
    accessor: "crystal.material",
  },
  {
    name: "Crystal shape",
    dict: CRYSTAL_SHAPE,
    type: FilterType.Category,
    filterOptions: Object.values(CrystalShape),
    accessor: "crystal.shape",
  },
  {
    name: "Vibrations per hour",
    dict: null,
    type: FilterType.Category,
    filterOptions: VPH,
    accessor: "caliber.vph",
  },
];

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
    accessor: string;
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
