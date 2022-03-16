interface DescriptionLineProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const DescriptionLine = ({
  label,
  value,
  unit,
}: DescriptionLineProps) => {
  return (
    <div className="grid grid-cols-2 w-full min-h-[24px] items-center">
      <div className="">{label}</div>
      <div>
        {value} {unit}
      </div>
    </div>
  );
};
