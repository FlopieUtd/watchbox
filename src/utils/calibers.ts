import { Caliber } from "src/types";
import calibersJson from "../json/calibers.json";

export const calibers = calibersJson as Caliber[];

export const getCaliberById = (caliberId: string) => {
  const result = calibers.find((caliber) => caliber.id === caliberId);

  if (!result) {
    throw new Error("Caliber not found in calibers JSON!");
  }

  return result;
};
