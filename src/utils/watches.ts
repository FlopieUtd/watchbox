import { getCaliberById } from "src/utils/calibers";
import watchesJson from "../json/watches.json";

export const watches = watchesJson.map((watch) => ({
  ...watch,
  caliber: {
    ...getCaliberById(watch.caliberId),
    // Some watches do not use all caliber complications, filter those
    complications: [
      ...getCaliberById(watch.caliberId).complications.filter(
        (complication) =>
          !(watch.unusedCaliberComplications ?? []).includes(complication)
      ),
    ],
  },
  watchCase: {
    ...watch.watchCase,
    detailedDiameter: {
      ...watch.watchCase.detailedDiameter,
      size: Math.round(
        (watch.watchCase.detailedDiameter.type === DiameterType.Rectangular
          ? watch.watchCase.detailedDiameter.width! *
            watch.watchCase.detailedDiameter.height! *
            0.9
          : Math.pow(watch.watchCase.detailedDiameter.diameter! / 2, 2) *
            Math.PI) +
          watch.watchCase.lugToLug * 10 +
          watch.watchCase.thickness * 10
      ),
    },
  },
})) as Watch[];

console.log(watches);

export const getWatchById = (watchId: string) => {
  const result = watches.find((watch) => watch.id === watchId);

  if (!result) {
    throw new Error("Watch not found in watches JSON!");
  }

  return result;
};

import { DiameterType, Watch } from "../types";

export const urlSafe = (string: string) =>
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
