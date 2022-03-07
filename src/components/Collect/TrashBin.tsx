import classNames from "classnames";
import { useDrop } from "react-dnd";

export interface TrashBinInterface {
  onRemove: (e: { id: string; row: number; column: number }) => void;
}

export const TrashBin = ({ onRemove }: TrashBinInterface) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "box",
    drop: onRemove,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const trashBinClass = classNames(
    "bg-slate-100 w-full h-48 mt-12 flex items-center justify-center absolute bottom-0 border-t transition uppercase text-2xl tracking-widest text-slate-300",
    canDrop && "opacity-100",
    !canDrop && "opacity-0",
    isOver && "bg-slate-200 text-slate-400"
  );

  return (
    <div className={trashBinClass} ref={drop}>
      Remove
    </div>
  );
};
