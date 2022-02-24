import classNames from "classnames";
import { watches } from "src/json";
import { getImageSrc } from "src/utils/getImageSrc";

interface BoxProps {
  rows: number;
  columns: number;
}

const colsMap: { [key: number]: string } = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const rowsMap: { [key: number]: string } = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
};

export const Box = ({ rows, columns }: BoxProps) => {
  const boxClass = classNames(
    `max-w-[960px] max-h-full p-8 grid gap-[1vw]`,
    colsMap[columns],
    rowsMap[rows]
  );

  const slots = Array.from(Array(rows * columns).keys());

  return (
    <div className="flex w-full">
      <div className="flex justify-center items-center w-full">
        <div className={boxClass}>
          {slots.map((slot) => (
            <div
              key={slot}
              className="bg-slate-100 w-auto h-auto flex justify-center items-center overflow-hidden"
            >
              {watches[slot] ? (
                <img
                  className="scale-110 "
                  src={getImageSrc(watches[slot])}
                  alt={watches[slot].reference}
                />
              ) : (
                <div className="p-4 text-slate-300 text-sm">
                  slot {slot + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
