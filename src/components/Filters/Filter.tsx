import { ReactNode } from "react";
import { StatefulCategoryFilterWithResults } from "src/filters/categoryFilters";
import { StatefulRangeFilter } from "src/filters/rangeFilters";

interface FilterProps {
  children: ReactNode;
  filter: StatefulCategoryFilterWithResults | StatefulRangeFilter;
}

export const Filter = ({ children, filter }: FilterProps) => {
  const { name, onClear, isActive } = filter;

  return (
    <div key={name} className="mb-2">
      <div className="flex justify-between border-b mb-2">
        <h3>{name}</h3>
        {isActive && (
          <button
            onClick={onClear}
            className="bg-slate-100 px-2 h-6 rounded hover:bg-slate-200 text-slate-500"
          >
            Clear
          </button>
        )}
      </div>
      {children}
    </div>
  );
};
