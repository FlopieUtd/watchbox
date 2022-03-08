import { observer } from "mobx-react-lite";
import { Filter } from "src/components/Filters/Filter";
import { StatefulCategoryFilterWithResults } from "src/filters/categoryFilters";

interface CategoryFilterProps {
  filter: StatefulCategoryFilterWithResults;
}

export const CategoryFilter = observer(({ filter }: CategoryFilterProps) => {
  return (
    <Filter filter={filter}>
      {filter.filterOptions
        .sort((a, b) => a.option.toString().localeCompare(b.option.toString()))
        .map((filterOption) => {
          const className = filterOption.results
            ? "cursor-pointer"
            : "opacity-20";

          return (
            <div key={filterOption.option}>
              <label
                htmlFor={String(filterOption.option)}
                className={className}
              >
                <input
                  type="checkbox"
                  id={String(filterOption.option)}
                  className="mr-2 cursor-pointer"
                  onChange={filter.onFilter}
                  checked={filter.activeFilterOptions.includes(
                    filterOption.option
                  )}
                  disabled={!filterOption.results}
                />
                {filter.dict[filterOption.option]}{" "}
                {!!filterOption.results && `(${filterOption.results})`}
              </label>
            </div>
          );
        })}
    </Filter>
  );
});
