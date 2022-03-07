import { Box } from "src/components/Collect/Box";

interface BoxMenuProps {
  boxes: Box[];
  onActiveBox: (id: string) => void;
  onOpenCreateBoxModal: () => void;
}

export const BoxMenu = ({
  boxes,
  onActiveBox,
  onOpenCreateBoxModal,
}: BoxMenuProps) => {
  return (
    <div className=" min-w-[280px] border-r">
      <div className="p-4">
        <h1>Boxes</h1>
      </div>
      {boxes.length && (
        <>
          <div className="border-b"></div>
          {boxes.map((box) => (
            <div
              className="border-b p-4 cursor-pointer hover:bg-slate-50 font-bold"
              key={box.id}
              onClick={() => {
                onActiveBox(box.id);
              }}
            >
              {box.name}
            </div>
          ))}
        </>
      )}
      <div className="flex justify-center items-center p-4">
        <button
          className="bg-slate-100 text-slate-500 px-2 py-1 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200"
          onClick={onOpenCreateBoxModal}
        >
          Create new box
        </button>
      </div>
    </div>
  );
};
