import { observer } from "mobx-react-lite";
import { createContext, ReactNode, useContext } from "react";
import {
  CategoryFilterState,
  categoryFiltersState,
} from "src/state/categoryFiltersState";
import { filterWatches } from "src/utils/filterWatches";
import {
  SearchFilterState,
  searchFilterState,
} from "src/state/searchFilterState";
import { Watch } from "src/types";
import { watches } from "src/utils/watches";
import { sortState } from "src/state/sortState";
import { sortWatches } from "src/utils/sortWatches";
import { filterModalState, FilterModalState } from "src/state/filterModalState";

interface ExploreContextInterface {
  allWatches: Watch[];
  filteredWatches: Watch[];
  categoryFilters: CategoryFilterState[];
  searchFilter: SearchFilterState;
  filterModal: FilterModalState;
}

const ExploreContext = createContext<ExploreContextInterface | null>(null);

interface ExploreProviderProps {
  children: ReactNode;
}

const ExploreProvider = observer(({ children }: ExploreProviderProps) => {
  const filteredWatches = filterWatches({
    watches,
    searchFilter: searchFilterState,
    categoryFilters: categoryFiltersState,
  });

  const sortedWatches = sortWatches({
    watches: filteredWatches,
    sort: sortState,
  });

  const value = {
    allWatches: watches,
    filteredWatches: sortedWatches,
    searchFilter: searchFilterState,
    categoryFilters: categoryFiltersState,
    filterModal: filterModalState,
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
