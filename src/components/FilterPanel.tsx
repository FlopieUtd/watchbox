import classNames from "classnames";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { ActiveFilter } from "src/components/ActiveFilter";
import { Button } from "src/components/Button";
import { FilterModal } from "src/components/FilterModal";
import { SIDE_PANEL_WIDTH, WatchAttributeCategory } from "src/constants";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";
import { useExplore } from "src/context/ExploreContext";
import { useModal } from "src/hooks/useModal";
import { SortDirection, sortState } from "src/state/sortState";

export const FilterPanel = observer(() => {
  const { isModalVisible, handleCloseModal, handleOpenModal } = useModal();
  const { searchFilter, filteredWatches, categoryFilters, filterModal } =
    useExplore();
  const { setActiveCategory } = filterModal;

  const sortButtonClass = classNames({
    "scale-y-[-1]": sortState.direction === SortDirection.Ascending,
  });

  const handleToggleSortDirection = () => {
    sortState.onSortDirection(
      sortState.direction === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending
    );
  };

  const activeFilters = categoryFilters.filter((filter) => filter.isActive);

  const handleActiveFilterEdit = (category: WatchAttributeCategory) => {
    console.log(category);
    setActiveCategory(category);
    handleOpenModal();
  };

  return (
    <>
      <div
        className="border-l p-6 overflow-y-auto h-full justify-between flex flex-col"
        style={{ width: SIDE_PANEL_WIDTH, minWidth: SIDE_PANEL_WIDTH }}
      >
        <div>
          Search
          <input
            type="search"
            placeholder="Manufacturer, model or reference"
            className="border rounded mb-4 w-full px-2 h-10"
            onChange={debounce(searchFilter.onFilter, 200)}
          />
          Sort by
          <div className="flex gap-4">
            <select
              name="sort"
              className="border rounded w-full px-2 h-10 mb-4"
              value={sortState.activeSort}
              onChange={sortState.onSort}
            >
              {WATCH_ATTRIBUTES.filter((attribute) => attribute.isSortable).map(
                (attribute) => (
                  <option key={attribute.name} value={attribute.name}>
                    {attribute.name}
                  </option>
                )
              )}
            </select>
            <button
              className="bg-slate-100 h-10 min-w-[2.5rem] flex items-center justify-center rounded hover:bg-slate-200"
              onClick={handleToggleSortDirection}
            >
              <img
                src="/icons/sort.svg"
                alt="Back"
                className={sortButtonClass}
              />
            </button>
          </div>
          <Button className="w-full mb-4" onClick={handleOpenModal}>
            Filters
          </Button>
          <div className="flex flex-col gap-4">
            {activeFilters.map((filter) => (
              <ActiveFilter
                key={filter.name}
                filter={filter}
                onEdit={handleActiveFilterEdit}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center w-full">
          {filteredWatches.length} result
          {filteredWatches.length === 1 ? "" : "s"}
        </div>
      </div>
      <FilterModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
});
