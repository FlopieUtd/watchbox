import { getCaliberById } from "src/utils/calibers";
import watchesJson from "../json/watches.json";

export const watches = watchesJson.map((watch) => ({
  ...watch,
  caliber: getCaliberById(watch.caliberId),
  watchCase: {
    ...watch.watchCase,
    detailedDiameter: {
      ...watch.watchCase.detailedDiameter,
      area:
        watch.watchCase.detailedDiameter.type === DiameterType.Rectangular
          ? watch.watchCase.detailedDiameter.width! *
            watch.watchCase.detailedDiameter.height!
          : Math.pow(watch.watchCase.detailedDiameter.diameter! / 2, 2) *
            Math.PI,
    },
  },
})) as Watch[];

export const getWatchById = (watchId: string) => {
  const result = watches.find((watch) => watch.id === watchId);

  if (!result) {
    throw new Error("Watch not found in watches JSON!");
  }

  return result;
};

import { DiameterType, Watch } from "../types";

const urlSafe = (string: string) =>
  string
    .toLowerCase()
    .replace(/[ &/\\#,+()$~%.'":*?<>{}_]/g, "-")
    .replace(/(-)\1+/g, "$1")
    // Remove diacritics https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getWatchId = ({
  manufacturer,
  reference,
}: Pick<Watch, "manufacturer" | "reference">) => {
  return `${urlSafe(manufacturer)}--${urlSafe(reference)}`;
};
