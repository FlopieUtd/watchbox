import { Button } from "src/components/Button";
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
        <h1 className="text-lg font-bold">Boxes</h1>
      </div>
      {boxes.length && (
        <>
          <div className="border-b"></div>
          {boxes.map((box) => (
            <div
              className="border-b p-4 cursor-pointer hover:bg-slate-50"
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
        <Button onClick={onOpenCreateBoxModal}>Create new box</Button>
      </div>
    </div>
  );
};
