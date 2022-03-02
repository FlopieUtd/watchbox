import { Watch } from "../types";
import { getWatchId } from "./getWatchId";

export const getCompressedImageSrc = (watch: Watch) => {
  return `/images/compressed/${getWatchId(watch)}.jpg`;
};

export const getImageSrc = (watch: Watch) => {
  return `/images/${getWatchId(watch)}.jpg`;
};
