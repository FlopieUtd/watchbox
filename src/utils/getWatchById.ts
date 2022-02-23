import { watches } from "../json";

export const getWatchById = (watchId: string) => {
  const result = watches.find((watch) => watch.id === watchId);

  if (!result) {
    throw new Error("Watch not found in watches JSON!");
  }

  return result;
};
