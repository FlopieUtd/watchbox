import { getCompressedImageSrc } from "src/utils/getImageSrc";
import { watches } from "src/utils/watches";

interface CatalogProps {
  onAdd: (id: string) => void;
}

export const Catalog = ({ onAdd }: CatalogProps) => {
  return (
    <div className="min-w-[280px] max-w-[280px] border-l grid grid-cols-2 h-full overflow-auto">
      {watches.map((watch) => {
        const handleAdd = () => {
          onAdd(watch.id);
        };

        return (
          <div key={watch.id} className="">
            <img
              className="cursor-pointer"
              src={getCompressedImageSrc(watch)}
              alt="alt"
              onClick={handleAdd}
            />
          </div>
        );
      })}
    </div>
  );
};
