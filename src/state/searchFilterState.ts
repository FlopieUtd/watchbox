import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { BaseFilter, FilterType } from "src/types";
import { normalizeString } from "src/utils/normalizeString";

export interface SearchFilter extends BaseFilter {
  type: FilterType;
}

export class SearchFilterState {
  searchString: string;

  constructor() {
    makeAutoObservable(this);
    this.searchString = "";
    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.searchString = normalizeString(event.target.value);
  }
}

export const searchFilterState = new SearchFilterState();
