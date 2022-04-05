import { useState } from "react";
import { Button } from "src/components/Button";
import { HandleCreateNewBox } from "src/components/Collect/Collect";
import { Modal } from "src/components/Modal";

export interface CreateBoxModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: ({ name, rows, columns }: HandleCreateNewBox) => void;
}

export const CreateBoxModal = ({
  isVisible,
  onClose,
  onSubmit,
}: CreateBoxModalProps) => {
  const [name, setName] = useState("New watch box");
  const [rows, setRows] = useState(2);
  const [columns, setColumns] = useState(3);

  const handleSubmit = () => {
    onSubmit({ name, rows, columns });
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="flex">
        <div>
          <h1>Create new box</h1>
          <form>
            <div className="mb-2">
              <div>Name</div>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
              />
            </div>
            <div className="mb-2">
              <div>Rows</div>
              <input
                type="number"
                onChange={(e) => {
                  setRows(Number(e.target.value));
                }}
                value={rows}
                min={1}
                max={4}
                className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
              />
            </div>
            <div className="mb-2">
              <div>Columns</div>
              <input
                type="number"
                onChange={(e) => {
                  setColumns(Number(e.target.value));
                }}
                value={columns}
                min={1}
                max={6}
                className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
              />
            </div>
            <div>
              <Button onClick={handleSubmit}>Create</Button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center ml-8 flex-col gap-2 w-48">
          {[...Array(rows).keys()].map((row) => (
            <div key={row} className="flex flex-row gap-2">
              {[...Array(columns).keys()].map((column) => (
                <div key={column} className="bg-slate-200 w-4 h-6"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
