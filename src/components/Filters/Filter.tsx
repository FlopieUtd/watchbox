import { ReactNode } from "react";
import { StatefulCategoryFilterWithResults } from "src/state/categoryFilters";

interface FilterProps {
  children: ReactNode;
  filter: StatefulCategoryFilterWithResults;
}

export const Filter = ({ children, filter }: FilterProps) => {
  const { name, onClear, isActive } = filter;

  return (
    <div key={name} className="mb-4">
      <div className="flex justify-between">
        <h2 className="mb-2">{name}</h2>
        {isActive && (
          <button
            onClick={onClear}
            className="bg-slate-100 px-2 h-6 rounded hover:bg-slate-200 text-slate-500"
          >
            Clear
          </button>
        )}
      </div>
      <div className="columns-3">{children}</div>
    </div>
  );
};
