import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { BaseFilter, FilterType } from "src/state";

export interface SearchFilter extends BaseFilter {
  type: FilterType;
}

export enum SortDirection {
  Ascending = "ASCENDING",
  Descending = "DESCENDING",
}

export class StatefulSort {
  activeSort: string;
  direction: SortDirection;

  constructor({
    activeSort,
    direction,
  }: {
    activeSort: string;
    direction: SortDirection;
  }) {
    makeAutoObservable(this);
    this.activeSort = activeSort;
    this.direction = direction;
    this.onSort = this.onSort.bind(this);
    this.onSortDirection = this.onSortDirection.bind(this);
  }

  onSort(event: ChangeEvent<HTMLSelectElement>) {
    this.activeSort = event.target.value;
  }

  onSortDirection(direction: SortDirection) {
    this.direction = direction;
  }
}

export const statefulSort = new StatefulSort({
  activeSort: "Case diameter",
  direction: SortDirection.Ascending,
});
