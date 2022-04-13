import { BoxSlot } from "src/components/Collect/BoxSlot";
import { InlineEdit } from "src/components/InlineEdit";

export interface Box {
  id: string;
  name: string;
  config: {
    rows: number;
    columns: number;
  };
  state: { watch: string | null }[][];
}
export interface BoxProps {
  box: Box;
  onRenameBox: ({ boxId, name }: { boxId: string; name: string }) => void;
  onRemove: (e: { row: number; column: number }) => void;
  onAssignWatchToSlot: (e: {
    id: string;
    row: number;
    column: number;
    boxId: string;
  }) => void;
}

export const Box = ({
  box,
  onRemove,
  onAssignWatchToSlot,
  onRenameBox,
}: BoxProps) => {
  const handleRename = (name: string) => {
    onRenameBox({ boxId: box.id, name });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-center mt-4">
        <InlineEdit value={box.name} setValue={handleRename} />
      </div>
      <div className="p-4 flex w-full h-full justify-center items-center flex-col relative">
        <div key={box.id} className="flex flex-col w-full gap-4 p-4">
          {box.state.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row w-full gap-4">
              {row.map((column, columnIndex) => (
                <BoxSlot
                  key={`${rowIndex}-${columnIndex}`}
                  slot={column}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  onAssignWatchToSlot={onAssignWatchToSlot}
                  box={box}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
