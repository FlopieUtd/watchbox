import { useState, useEffect } from "react";
import { StatefulSearchFilter } from "src/filters/searchFilter";
import { Watch } from "src/types";
import { normalizeString } from "src/utils/normalizeString";

interface useSearchFilterProps {
  watches: Watch[];
  searchFilter: StatefulSearchFilter;
}

export const useSearchFilter = ({
  watches,
  searchFilter,
}: useSearchFilterProps) => {
  const [result, setResult] = useState<Watch[]>(watches);

  useEffect(() => {
    setResult(
      watches.filter(
        (watch) =>
          normalizeString(watch.brand).includes(searchFilter.searchString) ||
          normalizeString(watch.model).includes(searchFilter.searchString) ||
          normalizeString(watch.reference).includes(searchFilter.searchString)
      )
    );
  }, [searchFilter.searchString, watches]);

  return result;
};
