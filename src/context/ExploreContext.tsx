import { observer } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import {
  StatefulCategoryFilter,
  statefulCategoryFilters,
} from "src/state/categoryFilters";
import { filterWatches } from "src/utils/filterWatches";
import {
  StatefulSearchFilter,
  statefulSearchFilter,
} from "src/state/searchFilter";
import { Watch } from "src/types";
import { watches } from "src/utils/watches";
import { statefulSort } from "src/state/sort";
import { sortWatches } from "src/utils/sortWatches";

interface ExploreContextInterface {
  allWatches: Watch[];
  filteredWatches: Watch[];
  categoryFilters: StatefulCategoryFilter[];
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
  });

  const sortedWatches = sortWatches({
    watches: filteredWatches,
    sort: statefulSort,
  });

  const value = {
    allWatches: watches,
    filteredWatches: sortedWatches,
    searchFilter: statefulSearchFilter,
    categoryFilters: statefulCategoryFilters,
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
