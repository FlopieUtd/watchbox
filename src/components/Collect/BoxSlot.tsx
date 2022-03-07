import classNames from "classnames";
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
}

export const BoxSlot = ({
  slot,
  rowIndex,
  columnIndex,
  onAssignWatchToSlot,
  box,
}: BoxSlotProps) => {
  const id = slot.watch;
  const [{ opacity }, drag] = useDrag(
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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ["box", "catalog"],
    drop: handleAssignWatchToSlot,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const slotClass = classNames(
    "transition w-full aspect-[2/3] flex items-center justify-center overflow-hidden",
    isOver && "bg-slate-200",
    !isOver && "bg-slate-100"
  );

  return (
    <div key={columnIndex} className={slotClass} ref={drop}>
      {slot.watch && (
        <div>
          <img
            className="scale-[1.1]"
            src={`/images/${slot.watch}.jpg`}
            alt="alt"
            ref={drag}
          />
        </div>
      )}
    </div>
  );
};
