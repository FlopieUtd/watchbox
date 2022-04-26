import { get } from "lodash";
import { WatchAttribute } from "src/constants";
import { Watch } from "src/types";

interface CompareLineProps {
  watches: (Watch | null)[];
  attribute: WatchAttribute;
}

export const CompareLine = ({ watches, attribute }: CompareLineProps) => {
  const { name, accessor, dict, unit } = attribute;
  return (
    <tr className="border-b">
      <td className="py-4 pr-16 ">{name}</td>
      {watches.map((watch) => {
        const value = get(watch, accessor);

        if (Array.isArray(value)) {
          return watch ? (
            <td key={watch.id} className="p-4">
              {value
                .map((v: string | number) => (dict ? dict[v] : v ?? "-"))
                .join(", ")}
            </td>
          ) : null;
        }

        return watch ? (
          <td key={watch.id} className="p-4">
            {dict ? dict[value] : value ?? "-"} {value && unit}
          </td>
        ) : (
          <td></td>
        );
      })}
    </tr>
  );
};
