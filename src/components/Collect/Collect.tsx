import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "src/components/Collect/Box";
import { BoxMenu } from "src/components/Collect/BoxMenu";
import { Catalog } from "src/components/Collect/Catalog";
import { CreateBoxModal } from "src/components/Collect/CreateBoxModal";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";

export interface HandleCreateNewBox {
  name: string;
  rows: number;
  columns: number;
}

export const Collect = () => {
  const [boxes, setBoxes] = useLocalStorage<Box[]>("boxes", [
    {
      id: "1",
      name: "Current",
      config: { rows: 2, columns: 3 },
      state: [
        [
          { watch: "junghans--027-3701-00" },
          { watch: "sinn--556-010" },
          { watch: "seiko--snxf05" },
        ],
        [
          { watch: "junghans--027-3701-00" },
          { watch: "sinn--556-010" },
          { watch: null },
        ],
      ],
    },
  ]);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(
    boxes.length ? boxes[0].id : null
  );

  const handleRemove = ({ row, column }: { row: number; column: number }) => {
    boxes[0].state[row - 1][column - 1].watch = null;
  };

  const handleAssignWatchToSlot = ({
    boxId,
    id,
    row,
    column,
  }: {
    boxId: string;
    id: string;
    row: number;
    column: number;
  }) => {
    const box = boxes.find((box) => box.id === boxId);

    if (!box) {
      return;
    }

    box.state[row - 1][column - 1].watch = id;

    setBoxes([...boxes.filter((box) => box.id !== boxId), box]);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenCreateBoxModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseCreateBoxModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log(boxes);
  }, [boxes.length]);

  const handleActiveBox = (id: string) => {
    setActiveBoxId(id);
  };

  const handleCreateNewBox = ({ name, rows, columns }: HandleCreateNewBox) => {
    console.log("add new box");
    setBoxes([
      ...boxes,
      {
        id: uuid(),
        name,
        config: { rows, columns },
        state: Array.from(Array(rows).keys()).map(() =>
          Array.from(Array(columns).keys()).map(() => ({ watch: null }))
        ),
      },
    ]);
  };

  const activeBox = boxes.find((box) => box.id === activeBoxId);

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex w-full">
          <div className="flex w-full ">
            <BoxMenu
              boxes={boxes}
              onActiveBox={handleActiveBox}
              onOpenCreateBoxModal={handleOpenCreateBoxModal}
            />
            {activeBox && (
              <Box
                box={activeBox}
                onRemove={handleRemove}
                onAssignWatchToSlot={handleAssignWatchToSlot}
              />
            )}
            <Catalog />
          </div>
        </div>
      </DndProvider>
      <CreateBoxModal
        isVisible={isModalVisible}
        onClose={handleCloseCreateBoxModal}
        onSubmit={handleCreateNewBox}
      />
    </>
  );
};
