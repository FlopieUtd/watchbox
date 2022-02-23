import { observer } from "mobx-react-lite";
import { NumberRange, StatefulRangeFilter } from "src/filters/rangeFilters";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

interface RangeFilterProps {
  filter: StatefulRangeFilter;
}

export const RangeFilter = observer(({ filter }: RangeFilterProps) => {
  const { range, onFilter, value, postfix, step } = filter;

  const handleFilter = (value: number[]) => {
    onFilter(value as NumberRange);
  };

  return (
    <>
      <Range
        min={range[0]}
        max={range[1]}
        step={step}
        value={[value[0], value[1]]}
        onChange={handleFilter}
      />
      <div>
        {value[0]} {postfix} - {value[1]} {postfix}
      </div>
    </>
  );
});
