import { getWatchId } from "src/utils/watches";
import { Watch } from "../types";

export const getCompressedImageSrc = (watch: Watch) => {
  return `images/compressed/${getWatchId(watch)}.jpg`;
};

export const getImageSrc = (watch: Watch) => {
  return `images/uncompressed/${getWatchId(watch)}.jpg`;
};
