import { Watch } from "../types";
import { getWatchId } from "./getWatchId";

export const getImageSrc = (watch: Watch) => {
  return `/images/${getWatchId(watch)}.jpg`;
};
