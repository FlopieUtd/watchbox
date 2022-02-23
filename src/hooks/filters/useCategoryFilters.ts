import { get } from "lodash";
import { useState, useEffect } from "react";
import { StatefulCategoryFilter } from "src/filters/categoryFilters";
import { Watch } from "src/types";

interface UseCategoryFiltersProps {
  watches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
}

export const useCategoryFilters = ({
  watches,
  categoryFilters,
}: UseCategoryFiltersProps) => {
  const [result, setResult] = useState<Watch[]>(watches);
  const activeFilters = categoryFilters
    .filter((categoryFilter) => categoryFilter.activeFilterOptions.length)
    .map(({ activeFilterOptions, name, accessor }) => ({
      name,
      activeFilterOptions,
      accessor,
    }));

  const hashed = JSON.stringify(activeFilters);

  useEffect(() => {
    let temp = watches;

    activeFilters.forEach((activeFilterCollection, index) => {
      temp = temp.filter((watch) =>
        activeFilters[index].activeFilterOptions.includes(
          get(watch, activeFilterCollection.accessor)
        )
      );
    });
    setResult(temp);
    // eslint-disable-next-line
  }, [hashed, watches]);

  return result;
};
