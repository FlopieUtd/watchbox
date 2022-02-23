import { observer } from "mobx-react-lite";
import { CategoryFilter } from "src/components/Filters/CategoryFilter";
import { RangeFilter } from "src/components/Filters/RangeFilter";
import { useExplore } from "src/context/ExploreContext";
import { useFilterResults } from "src/hooks/useFilterResults";

export const FilterPanel = observer(() => {
  const { filteredWatches, searchFilter, categoryFilters, rangeFilters } =
    useExplore();
  const filterResults = useFilterResults({
    watches: filteredWatches,
    searchFilter,
    categoryFilters,
    rangeFilters,
  });

  const categoryFiltersWithResults = categoryFilters.map(
    (categoryFilter, index) => ({
      ...categoryFilter,
      filterOptions: [
        ...categoryFilter.filterOptions.map((option, index2) => ({
          option: option,
          results: filterResults[index].filterOptions[index2].results,
        })),
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
