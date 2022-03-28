import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { FilterPanel } from "src/components/FilterPanel";
import { MANUFACTURER } from "src/constants";
import { useExplore } from "src/context/ExploreContext";
import { getCompressedImageSrc } from "src/utils/getImageSrc";

export const Explore = observer(() => {
  const { filteredWatches } = useExplore();

  return (
    <>
      <div className="w-full overflow-x-hidden overflow-y-auto">
        <div className="flex justify-center p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1080px]">
            {filteredWatches.map((watch) => {
              const { manufacturer, model, id } = watch;
              return (
                <Link key={id} to={`/watches/${id}`}>
                  <div className="bg-slate-100 aspect-square overflow-hidden mb-4">
                    <img
                      src={getCompressedImageSrc(watch)}
                      alt={watch.reference}
                      className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="text-sm text-center font-noto-sans">
                    {MANUFACTURER[manufacturer]} - {model}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <FilterPanel />
    </>
  );
});
