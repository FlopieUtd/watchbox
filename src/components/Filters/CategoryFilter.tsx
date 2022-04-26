import { observer } from "mobx-react-lite";
import { Filter } from "src/components/Filters/Filter";
import { CategoryFilterStateWithResults } from "src/state/categoryFiltersState";

interface CategoryFilterProps {
  filter: CategoryFilterStateWithResults;
}

export const CategoryFilter = observer(({ filter }: CategoryFilterProps) => {
  return (
    <Filter filter={filter}>
      {filter.filterOptions.map((filterOption) => {
        const className = filterOption.results
          ? "cursor-pointer"
          : "opacity-20";

        const id = `${filter.name}-${filterOption.option}`;

        const handleChange = () => {
          filter.onFilter(filterOption.option.toString());
        };

        return (
          <div key={id}>
            <label htmlFor={id} className={className}>
              <input
                type="checkbox"
                id={id}
                className="mr-2"
                onChange={handleChange}
                checked={filter.activeFilterOptions.includes(
                  filterOption.option.toString()
                )}
                disabled={!filterOption.results}
                style={{
                  cursor: filterOption.results ? "pointer" : "default",
                }}
              />
              {filter.dict
                ? filter.dict[filterOption.option]
                : filterOption.option}{" "}
              {filter.unit && `${filter.unit} `}
              {!!filterOption.results && `(${filterOption.results})`}
            </label>
          </div>
        );
      })}
    </Filter>
  );
});
