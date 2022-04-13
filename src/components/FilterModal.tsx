import { useState } from "react";
import { CategoryFilter } from "src/components/Filters/CategoryFilter";
import { Modal } from "src/components/Modal";
import {
  WatchAttributeCategory,
  WATCH_ATTRIBUTE_CATEGORY,
} from "src/constants";
import { useExplore } from "src/context/ExploreContext";
import { StatefulCategoryFilterWithResults } from "src/state/categoryFilters";
import { filterWatches } from "src/utils/filterWatches";
import { getFilterResults } from "src/utils/getFilterResults";
import { watches } from "src/utils/watches";

export interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FilterModal = ({ isVisible, onClose }: FilterModalProps) => {
  const { filteredWatches, searchFilter, categoryFilters } = useExplore();
  const [activeCategory, setActiveCategory] = useState(
    WatchAttributeCategory.Manufacturer
  );
  const filterResults = getFilterResults({
    watches: filteredWatches,
    searchFilter,
    categoryFilters,
  });

  const categoryFiltersWithResults: StatefulCategoryFilterWithResults[] =
    categoryFilters.map((categoryFilter, index) => ({
      ...categoryFilter,
      onFilter: categoryFilter.onFilter,
      onClear: categoryFilter.onClear,
      filterOptions: [
        // If a filter has an active filter option, exclude that filter from the filter results.
        // Otherwise all other options get 0 as a result
        ...(categoryFilter.activeFilterOptions.length
          ? categoryFilter.filterOptions.map((option, index2) => ({
              option: option,
              results: getFilterResults({
                watches: filterWatches({
                  watches,
                  searchFilter: searchFilter,
                  categoryFilters: categoryFilters.filter(
                    (cf) => cf.name !== categoryFilter.name
                  ),
                }),
                searchFilter,
                categoryFilters,
              })[index].filterOptions[index2].results,
            }))
          : categoryFilter.filterOptions.map((option, index2) => ({
              option: option,
              results: filterResults[index].filterOptions[index2].results,
            }))),
      ],
    }));

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="flex gap-4 h-[70vh]">
        <div className="flex flex-col">
          {Object.values(WatchAttributeCategory)
            .filter((category) => category !== WatchAttributeCategory.General)
            .map((category) => (
              <button
                key={category}
                className="text-left px-4 py-2 hover:bg-slate-100 w-48"
                onClick={() => {
                  setActiveCategory(category);
                }}
                style={{
                  textDecoration:
                    category === activeCategory ? "underline" : "none",
                }}
              >
                {WATCH_ATTRIBUTE_CATEGORY[category]}
              </button>
            ))}
        </div>
        <div className="overflow-y-auto min-w-[720px] h-full">
          {categoryFiltersWithResults
            .filter((filter) => filter.category === activeCategory)
            .map((filter) => {
              return <CategoryFilter filter={filter} key={filter.name} />;
            })}
        </div>
      </div>
    </Modal>
  );
};
