import { makeAutoObservable } from "mobx";
import { BaseFilter, FilterType } from "src/filters";
import { getRange } from "src/utils/getRange";
import { RangeFilterWatchAttribute, WATCH_ATTRIBUTES } from "src/constants";

export type NumberRange = [number, number];

export interface RangeFilter extends BaseFilter {
  range: NumberRange;
  unit?: string;
  step: number;
}

export class StatefulRangeFilter {
  name: string;
  accessor: string;
  type: FilterType.Category;
  range: NumberRange;
  value: NumberRange;
  unit?: string;
  step: number;
  isActive = false;

  constructor({
    name,
    accessor,
    unit,
    step,
  }: {
    name: string;
    accessor: string;
    unit?: string;
    step: number;
  }) {
    makeAutoObservable(this);
    this.name = name;
    this.accessor = accessor;
    this.range = getRange(accessor);
    this.value = getRange(accessor);
    this.unit = unit;
    this.onFilter = this.onFilter.bind(this);
    this.onClear = this.onClear.bind(this);
    this.step = step;
  }

  onFilter(value: NumberRange) {
    this.value = value;

    this.isActive = !(
      this.value[0] === this.range[0] && this.value[1] === this.range[1]
    );
  }

  onClear() {
    this.value = this.range;
    this.isActive = false;
  }
}

// @ts-ignore TS doesn't narrow down output type
const rangeFilters: RangeFilterWatchAttribute[] = WATCH_ATTRIBUTES.filter(
  (filter) => filter.filterType === FilterType.Range
);

export const statefulRangeFilters = rangeFilters.map(
  (filter) =>
    new StatefulRangeFilter({
      ...filter,
    })
);
