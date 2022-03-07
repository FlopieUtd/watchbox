import { useDrag } from "react-dnd";
import { getCompressedImageSrc } from "src/utils/getImageSrc";
import { watches } from "src/utils/watches";

export const Catalog = () => {
  return (
    <div className="min-w-[280px] max-w-[280px] border-l grid grid-cols-2 h-full overflow-auto">
      {watches.map((watch) => {
        const [{ opacity }, drag] = useDrag(
          () => ({
            type: "catalog",
            item: {
              id: watch.id,
            },
            collect: (monitor) => ({
              opacity: monitor.isDragging() ? 0.4 : 1,
            }),
          }),
          []
        );

        return (
          <div key={watch.id} className="">
            <img
              className=""
              src={getCompressedImageSrc(watch)}
              alt="alt"
              ref={drag}
            />
          </div>
        );
      })}
    </div>
  );
};
