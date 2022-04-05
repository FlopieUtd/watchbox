import classNames from "classnames";
import { debounce } from "lodash";
import { observer } from "mobx-react-lite";
import { Button } from "src/components/Button";
import { FilterModal } from "src/components/FilterModal";
import { SIDE_PANEL_WIDTH } from "src/constants";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";
import { useExplore } from "src/context/ExploreContext";
import { useModal } from "src/hooks/useModal";
import { SortDirection, statefulSort } from "src/state/sort";

export const FilterPanel = observer(() => {
  const { isModalVisible, handleCloseModal, handleOpenModal } = useModal();
  const { searchFilter } = useExplore();

  const sortButtonClass = classNames({
    "scale-y-[-1]": statefulSort.direction === SortDirection.Ascending,
  });

  const handleToggleSortDirection = () => {
    statefulSort.onSortDirection(
      statefulSort.direction === SortDirection.Ascending
        ? SortDirection.Descending
        : SortDirection.Ascending
    );
  };

  return (
    <>
      <div
        className="border-l p-6 overflow-y-auto"
        style={{ width: SIDE_PANEL_WIDTH, minWidth: SIDE_PANEL_WIDTH }}
      >
        Search
        <input
          type="search"
          placeholder="Manufacturer, model or ref"
          className="border rounded mb-4 w-full px-2 h-10"
          onChange={debounce(searchFilter.onFilter, 200)}
        />
        Sort by
        <div className="flex gap-4">
          <select
            name="sort"
            className="border rounded w-full px-2 h-10 mb-4"
            value={statefulSort.activeSort}
            onChange={statefulSort.onSort}
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
            <img src="/icons/sort.svg" alt="Back" className={sortButtonClass} />
          </button>
        </div>
        <Button className="w-full mb-4" onClick={handleOpenModal}>
          Filters
        </Button>
      </div>
      <FilterModal isVisible={isModalVisible} onClose={handleCloseModal} />
    </>
  );
});
