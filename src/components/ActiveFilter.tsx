import { WatchAttributeCategory } from "src/constants";
import { CategoryFilterState } from "src/state/categoryFiltersState";

interface ActiveFilterProps {
  filter: CategoryFilterState;
  onEdit: (category: WatchAttributeCategory) => void;
}

export const ActiveFilter = ({ filter, onEdit }: ActiveFilterProps) => {
  return (
    <div className="rounded overflow-hidden">
      <div className="bg-slate-300 w-full flex justify-start px-4 py-2 ">
        {filter.name}
      </div>
      <div className="bg-slate-100 flex  relative">
        <button
          className="w-full bg-slate-100 hover:bg-slate-200 flex flex-col"
          onClick={() => onEdit(filter.category)}
        >
          <div className="flex flex-col items-start px-4 py-2">
            {filter.activeFilterOptions.map((option) => (
              <div key={option}>
                {filter.dict ? filter.dict[option] : option}
              </div>
            ))}
          </div>
        </button>
        <button
          className="h-full flex items-center justify-center bg-slate-100 p-2 hover:bg-slate-200 absolute right-0"
          onClick={filter.onClear}
        >
          <img src="/icons/cross.svg" alt="Remove" width={"12px"} />
        </button>
      </div>
    </div>
  );
};
