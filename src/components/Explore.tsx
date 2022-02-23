import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { FilterPanel } from "src/components/FilterPanel";
import { BRAND } from "src/constants";
import { useExplore } from "src/context/ExploreContext";
import { getImageSrc } from "src/utils/getImageSrc";

export const Explore = observer(() => {
  const { filteredWatches } = useExplore();

  return (
    <>
      <div className="m-4 w-full overflow-x-hidden overflow-y-auto">
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-[1080px]">
            {filteredWatches
              .sort((a, b) => a.watch_case.diameter - b.watch_case.diameter)
              .map((watch) => {
                const { brand, model, id } = watch;
                return (
                  <Link key={id} to={`/watches/${id}`}>
                    <div className="bg-slate-100 aspect-square overflow-hidden mb-2">
                      <img
                        src={getImageSrc(watch)}
                        alt={watch.reference}
                        className="object-cover w-full h-full scale-105 hover:scale-110 transition-transform	"
                      />
                    </div>
                    <div className="text-xs text-center">
                      {BRAND[brand]} - {model}
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
