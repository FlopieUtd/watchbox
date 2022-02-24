import { observer } from "mobx-react-lite";
import { CategoryFilter } from "src/components/Filters/CategoryFilter";
import { RangeFilter } from "src/components/Filters/RangeFilter";
import { useExplore } from "src/context/ExploreContext";
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

  const categoryFiltersWithResults = categoryFilters.map(
    (categoryFilter, index) => ({
      ...categoryFilter,
      filterOptions: [
        // If a categoryFilter has an active filter option, calculate the results for this filter
        // as if the filter is not active. Otherwise all other options get 0 as a result
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
    })
  );

  return (
    <div className="border-l p-6 min-w-[280px] w-[280px] overflow-y-auto">
      <input
        type="search"
        placeholder="Brand, model, reference"
        className="border rounded mb-4 w-full"
        onChange={searchFilter.onFilter}
      />
      <div>
        {categoryFiltersWithResults.map((filter) => {
          return (
            <div key={filter.name}>
              <h2>{filter.name}</h2>
              {/*  @ts-ignore */}
              <CategoryFilter filter={filter} />
            </div>
          );
        })}
      </div>
      {rangeFilters.map((filter) => {
        return (
          <div key={filter.name}>
            <h2>{filter.name}</h2>
            <RangeFilter filter={filter} />
          </div>
        );
      })}
    </div>
  );
});
