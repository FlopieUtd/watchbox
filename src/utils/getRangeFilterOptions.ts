import { get } from "lodash";
import { Accessor } from "src/types";
import { watches } from "src/utils/watches";

export const getRangeFilterOptions = (accessor: Accessor) => {
  const result: number[] = [];

  watches.map((watch) => {
    const value = get(watch, accessor);
    if (value === null) {
      return;
    }

    const flooredValue = Math.floor(value);

    if (!result.includes(flooredValue)) {
      result.push(flooredValue);
    }
  });

  return result.sort((a, b) => a - b);
};
