import { makeAutoObservable } from "mobx";
import { ChangeEvent } from "react";
import { BaseFilter, FilterType } from "src/filters";
import { normalizeString } from "src/utils/normalizeString";

export interface SearchFilter extends BaseFilter {
  type: FilterType;
}

export class StatefulSearchFilter {
  name: string;
  searchString: string;

  constructor({ name }: { name: string }) {
    makeAutoObservable(this);
    this.name = name;
    this.searchString = "";
    this.onFilter = this.onFilter.bind(this);
  }

  onFilter(event: ChangeEvent<HTMLInputElement>) {
    this.searchString = normalizeString(event.target.value);
  }
}

export const statefulSearchFilter = new StatefulSearchFilter({
  name: "Manufacturer, model, or reference",
});
