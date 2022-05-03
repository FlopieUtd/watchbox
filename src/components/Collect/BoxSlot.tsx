import classNames from "classnames";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Box } from "src/components/Collect/Box";

interface BoxSlotProps {
  slot: { watch: string | null };
  rowIndex: number;
  columnIndex: number;
  box: Box;
  onAssignWatchToSlot: ({
    boxId,
    id,
    row,
    column,
  }: {
    boxId: string;
    id: string;
    row: number;
    column: number;
  }) => void;
  onRemove: ({ row, column }: { row: number; column: number }) => void;
}

export const BoxSlot = ({
  slot,
  rowIndex,
  columnIndex,
  onAssignWatchToSlot,
  box,
  onRemove,
}: BoxSlotProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const id = slot.watch;
  const [, drag] = useDrag(
    () => ({
      type: "box",
      item: {
        id,
        row: rowIndex + 1,
        column: columnIndex + 1,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [id]
  );

  const handleAssignWatchToSlot = (e: { id: string }) => {
    onAssignWatchToSlot({
      boxId: box.id,
      id: e.id,
      row: rowIndex + 1,
      column: columnIndex + 1,
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: ["box", "catalog"],
    drop: handleAssignWatchToSlot,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const slotClass = classNames(
    "transition w-full aspect-[2/3] flex items-center justify-center group relative",
    isOver && "bg-slate-100",
    !isOver && slot.watch && "bg-white",
    !slot.watch && "bg-slate-100"
  );

  const handleRemove = () => {
    onRemove({
      row: rowIndex + 1,
      column: columnIndex + 1,
    });
  };

  const imageClass = classNames(
    "scale-[1.2] transition mix-blend-multiply",
    isImageLoaded && "opacity-100",
    !isImageLoaded && "opacity-0"
  );

  return (
    <div key={columnIndex} className={slotClass} ref={drop}>
      {slot.watch && (
        <>
          <div>
            <img
              className={imageClass}
              src={`/images/uncompressed/${slot.watch}.jpg`}
              alt="alt"
              ref={drag}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          </div>
          <button
            className="transition absolute top-0 right-0 opacity-0 group-hover:opacity-100 bg-slate-100 rounded-sm hover:bg-slate-200 w-10 h-10 flex items-center justify-center"
            onClick={handleRemove}
          >
            <img src="/icons/trash.svg" alt="Back" />
          </button>
        </>
      )}
    </div>
  );
};
