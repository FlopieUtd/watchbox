import { get } from "lodash";
import { useState, useEffect } from "react";
import { StatefulRangeFilter } from "src/filters/rangeFilters";
import { Watch } from "src/types";

interface useRangeFiltersProps {
  watches: Watch[];
  rangeFilters: StatefulRangeFilter[];
}

export const useRangeFilters = ({
  watches,
  rangeFilters,
}: useRangeFiltersProps) => {
  const [result, setResult] = useState<Watch[]>(watches);

  const activeFilters = rangeFilters.filter(
    (rangeFilter) =>
      !(
        rangeFilter.value[0] === rangeFilter.range[0] &&
        rangeFilter.value[1] === rangeFilter.range[1]
      )
  );

  const hashed = JSON.stringify(activeFilters);

  useEffect(() => {
    let temp = watches;

    activeFilters.forEach((activeFilter, index) => {
      temp = temp.filter(
        (watch) =>
          get(watch, activeFilter.accessor) >= activeFilter.value[0] &&
          get(watch, activeFilter.accessor) <= activeFilter.value[1]
      );
    });
    setResult(temp);
    // eslint-disable-next-line
  }, [hashed, watches]);

  return result;
};
