import { makeAutoObservable } from "mobx";
import { WatchAttributeCategory } from "src/constants";
import { BaseFilter, FilterType } from "src/types";

export interface SearchFilter extends BaseFilter {
  type: FilterType;
}

export class FilterModalState {
  activeCategory: WatchAttributeCategory;

  constructor() {
    makeAutoObservable(this);
    this.activeCategory = WatchAttributeCategory.Manufacturer;
    this.setActiveCategory = this.setActiveCategory.bind(this);
  }

  setActiveCategory(category: WatchAttributeCategory) {
    this.activeCategory = category;
  }
}

export const filterModalState = new FilterModalState();
