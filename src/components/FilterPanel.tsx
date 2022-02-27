import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { CategoryFilter } from "src/components/Filters/CategoryFilter";
import { RangeFilter } from "src/components/Filters/RangeFilter";
import { useExplore } from "src/context/ExploreContext";
import { StatefulCategoryFilterWithResults } from "src/filters/categoryFilters";
import { filterWatches } from "src/filters/filterWatches";
import { getFilterResults } from "src/filters/getFilterResults";
import { watches } from "src/json";

export const FilterPanel = observer(() => {
  const { filteredWatches, searchFilter, categoryFilters, rangeFilters } =
    useExplore();
  const filterResults = getFilterResults({
    watches: filteredWatches,
    searchFilter,
    categoryFilters,
    rangeFilters,
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
                  rangeFilters: rangeFilters,
                }),
                searchFilter,
                categoryFilters,
                rangeFilters,
              })[index].filterOptions[index2].results,
            }))
          : categoryFilter.filterOptions.map((option, index2) => ({
              option: option,
              results: filterResults[index].filterOptions[index2].results,
            }))),
      ],
    }));

  return (
    <div className="border-l p-6 min-w-[280px] w-[280px] overflow-y-auto">
      <input
        type="search"
        placeholder="Brand, model, or reference"
        className="border rounded mb-4 w-full px-2 py-1"
        onChange={debounce(searchFilter.onFilter, 200)}
      />
      {categoryFiltersWithResults.map((filter) => {
        return <CategoryFilter filter={filter} key={filter.name} />;
      })}
      {rangeFilters.map((filter) => {
        return <RangeFilter filter={filter} key={filter.name} />;
      })}
    </div>
  );
});
