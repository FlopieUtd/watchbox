import { Watch } from "../types";

const urlSafe = (string: string) =>
  string
    .toLowerCase()
    .replace(/[ &/\\#,+()$~%.'":*?<>{}_]/g, "-")
    .replace(/(-)\1+/g, "$1")
    // Remove diacritics https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getWatchId = ({ brand, reference }: Watch) => {
  return `${urlSafe(brand)}--${urlSafe(reference)}`;
};
