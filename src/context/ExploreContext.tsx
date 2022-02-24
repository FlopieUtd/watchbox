import { observer } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import {
  StatefulCategoryFilter,
  statefulCategoryFilters,
} from "src/filters/categoryFilters";
import { filterWatches } from "src/filters/filterWatches";
import {
  StatefulRangeFilter,
  statefulRangeFilters,
} from "src/filters/rangeFilters";
import {
  StatefulSearchFilter,
  statefulSearchFilter,
} from "src/filters/searchFilter";
import { watches } from "src/json";
import { Watch } from "src/types";

interface ExploreContextInterface {
  allWatches: Watch[];
  filteredWatches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
  rangeFilters: StatefulRangeFilter[];
  searchFilter: StatefulSearchFilter;
}

const ExploreContext = createContext<ExploreContextInterface | null>(null);

interface ExploreProviderProps {
  children: ReactNode;
}

const ExploreProvider = observer(({ children }: ExploreProviderProps) => {
  const filteredWatches = filterWatches({
    watches,
    searchFilter: statefulSearchFilter,
    categoryFilters: statefulCategoryFilters,
    rangeFilters: statefulRangeFilters,
  });

  const value = {
    allWatches: watches,
    filteredWatches,
    searchFilter: statefulSearchFilter,
    categoryFilters: statefulCategoryFilters,
    rangeFilters: statefulRangeFilters,
  };

  return (
    <ExploreContext.Provider value={value}>{children}</ExploreContext.Provider>
  );
});

const useExplore = () => {
  const context = useContext(ExploreContext);
  if (context === null) {
    throw new Error("useExplore must be used within an ExploreProvider");
  }
  return context;
};

export { ExploreProvider, useExplore };
