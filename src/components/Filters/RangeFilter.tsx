import { observer } from "mobx-react-lite";
import { NumberRange, StatefulRangeFilter } from "src/filters/rangeFilters";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Filter } from "src/components/Filters/Filter";

interface RangeFilterProps {
  filter: StatefulRangeFilter;
}

export const RangeFilter = observer(({ filter }: RangeFilterProps) => {
  const { range, onFilter, value, unit, step } = filter;

  const handleFilter = (value: number[]) => {
    onFilter(value as NumberRange);
  };

  return (
    <Filter filter={filter}>
      <Range
        min={range[0]}
        max={range[1]}
        step={step}
        value={[value[0], value[1]]}
        onChange={handleFilter}
      />
      <div>
        {value[0]} {unit} - {value[1]} {unit}
      </div>
    </Filter>
  );
});
