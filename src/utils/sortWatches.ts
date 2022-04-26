import { get } from "lodash";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";
import { SortDirection, SortState } from "src/state/sortState";
import { Watch } from "src/types";

interface SortWatches {
  watches: Watch[];
  sort: SortState;
}

export const sortWatches = ({ watches, sort }: SortWatches) => {
  const watchAttribute = WATCH_ATTRIBUTES.find(
    (attribute) => attribute.name === sort.activeSort
  );

  if (!watchAttribute) {
    throw new Error("No valid sort!");
  }

  return watches.sort((a, b) =>
    sort.direction === SortDirection.Ascending
      ? get(a, watchAttribute.accessor) - get(b, watchAttribute.accessor)
      : get(b, watchAttribute.accessor) - get(a, watchAttribute.accessor)
  );
};
