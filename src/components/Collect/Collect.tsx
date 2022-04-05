import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Box } from "src/components/Collect/Box";
import { BoxMenu } from "src/components/Collect/BoxMenu";
import { Catalog } from "src/components/Collect/Catalog";
import { CreateBoxModal } from "src/components/Collect/CreateBoxModal";
import { useModal } from "src/hooks/useModal";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuid } from "uuid";

export interface HandleCreateNewBox {
  name: string;
  rows: number;
  columns: number;
}

export const Collect = () => {
  const { isModalVisible, handleOpenModal, handleCloseModal } = useModal();
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
    if (!activeBox) {
      return null;
    }

    activeBox.state[row - 1][column - 1].watch = null;

    setBoxes([...boxes.filter((box) => box.id !== activeBox.id), activeBox]);
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

  const handleActiveBox = (id: string) => {
    setActiveBoxId(id);
  };

  const handleCreateNewBox = ({ name, rows, columns }: HandleCreateNewBox) => {
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

  const handleRenameBox = ({
    boxId,
    name,
  }: {
    boxId: string;
    name: string;
  }) => {
    const box = boxes.find((box) => box.id === boxId);

    if (!box) {
      return;
    }

    box.name = name;

    setBoxes([...boxes.filter((box) => box.id !== boxId), box]);
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
              onOpenCreateBoxModal={handleOpenModal}
            />
            {activeBox && (
              <Box
                box={activeBox}
                onRemove={handleRemove}
                onAssignWatchToSlot={handleAssignWatchToSlot}
                onRenameBox={handleRenameBox}
              />
            )}
            <Catalog />
          </div>
        </div>
      </DndProvider>
      <CreateBoxModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSubmit={handleCreateNewBox}
      />
    </>
  );
};
