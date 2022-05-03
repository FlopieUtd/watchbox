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
        const isChecked = filter.activeFilterOptions.includes(
          filterOption.option.toString()
        );

        const className =
          filterOption.results || isChecked ? "cursor-pointer" : "opacity-20";

        const id = `${filter.name}-${filterOption.option}`;

        const handleChange = () => {
          filter.onFilter(filterOption.option.toString());
        };

        return (
          <div key={id} className="py-0.5">
            <label htmlFor={id} className={className}>
              <input
                type="checkbox"
                id={id}
                className="mr-2"
                onChange={handleChange}
                checked={isChecked}
                disabled={!filterOption.results && !isChecked}
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
