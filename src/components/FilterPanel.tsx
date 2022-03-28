import classNames from "classnames";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { CategoryFilter } from "src/components/Filters/CategoryFilter";
import { SIDE_PANEL_WIDTH } from "src/constants";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";
import { useExplore } from "src/context/ExploreContext";
import { StatefulCategoryFilterWithResults } from "src/state/categoryFilters";
import { SortDirection, statefulSort } from "src/state/sort";
import { filterWatches } from "src/utils/filterWatches";
import { getFilterResults } from "src/utils/getFilterResults";
import { watches } from "src/utils/watches";

export const FilterPanel = observer(() => {
  const { filteredWatches, searchFilter, categoryFilters } = useExplore();
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

  const sortButtonClass = classNames({
    "scale-y-[-1]": statefulSort.direction === SortDirection.Ascending,
  });

  const handleToggleSortDirection = () => {
    statefulSort.onSortDirection(
      statefulSort.direction === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending
    );
  };

  return (
    <div
      className="border-l p-6 overflow-y-auto"
      style={{ width: SIDE_PANEL_WIDTH, minWidth: SIDE_PANEL_WIDTH }}
    >
      <input
        type="search"
        placeholder="Search manufacturer or model"
        className="border rounded mb-4 w-full px-2 h-10"
        onChange={debounce(searchFilter.onFilter, 200)}
      />
      Sort by
      <div className="flex gap-4">
        <select
          name="sort"
          className="border rounded w-full px-2 h-10 mb-4"
          value={statefulSort.activeSort}
          onChange={statefulSort.onSort}
        >
          {WATCH_ATTRIBUTES.filter((attribute) => attribute.isSortable).map(
            (attribute) => (
              <option key={attribute.name} value={attribute.name}>
                {attribute.name}
              </option>
            )
          )}
        </select>
        <button
          className="bg-slate-100 h-10 min-w-[2.5rem] flex items-center justify-center rounded hover:bg-slate-200"
          onClick={handleToggleSortDirection}
        >
          <img src="/icons/sort.svg" alt="Back" className={sortButtonClass} />
        </button>
      </div>
      {categoryFiltersWithResults.map((filter) => {
        return <CategoryFilter filter={filter} key={filter.name} />;
      })}
    </div>
  );
});
