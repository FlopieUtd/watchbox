import { NumberRange } from "src/filters/rangeFilters";
import { watches } from "src/json";
import { get } from "lodash";

export const getRange = (accessor: string): NumberRange => {
  const sorted = watches.sort((a, b) => get(a, accessor) - get(b, accessor));

  return [get(sorted[0], accessor), get(sorted[sorted.length - 1], accessor)];
};
