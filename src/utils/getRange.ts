import { NumberRange } from "src/filters/rangeFilters";
import { get } from "lodash";
import { watches } from "src/utils/watches";

export const getRange = (accessor: string): NumberRange => {
  const sorted = watches.sort((a, b) => get(a, accessor) - get(b, accessor));

  return [get(sorted[0], accessor), get(sorted[sorted.length - 1], accessor)];
};
