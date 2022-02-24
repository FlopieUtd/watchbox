import { makeAutoObservable } from "mobx";
import { BaseFilter, FilterType } from "src/filters";
import { getRange } from "src/utils/getRange";

export type NumberRange = [number, number];

export interface RangeFilter extends BaseFilter {
  range: NumberRange;
  postfix?: string;
  step: number;
}

const rangeFilters: RangeFilter[] = [
  {
    name: "Case diameter",
    type: FilterType.Range,
    range: getRange("watch_case.diameter"),
    accessor: "watch_case.diameter",
    postfix: "mm",
    step: 0.5,
  },
  {
    name: "Case thickness",
    type: FilterType.Range,
    range: getRange("watch_case.thickness"),
    accessor: "watch_case.thickness",
    postfix: "mm",
    step: 0.5,
  },
  {
    name: "Water resistance",
    type: FilterType.Range,
    range: getRange("watch_case.water_resistance"),
    accessor: "watch_case.water_resistance",
    postfix: "bar",
    step: 1,
  },
  {
    name: "Lug to lug",
    type: FilterType.Range,
    range: getRange("watch_case.lug_to_lug"),
    accessor: "watch_case.lug_to_lug",
    postfix: "mm",
    step: 0.5,
  },
  {
    name: "Lug width",
    type: FilterType.Range,
    range: getRange("watch_case.lug_width"),
    accessor: "watch_case.lug_width",
    postfix: "mm",
    step: 1,
  },
];

export class StatefulRangeFilter {
  name: string;
  accessor: string;
  type: FilterType.Category;
  range: NumberRange;
  value: NumberRange;
  postfix?: string;
  step: number;

  constructor({
    name,
    accessor,
    range,
    postfix,
    step,
  }: {
    name: string;
    accessor: string;
    range: NumberRange;
    postfix?: string;
    step: number;
  }) {
    makeAutoObservable(this);
    this.name = name;
    this.accessor = accessor;
    this.range = range;
    this.value = range;
    this.postfix = postfix;
    this.onFilter = this.onFilter.bind(this);
    this.step = step;
  }

  onFilter(value: NumberRange) {
    this.value = value;
  }
}

export const statefulRangeFilters = rangeFilters.map(
  (filter) =>
    new StatefulRangeFilter({
      ...filter,
    })
);
