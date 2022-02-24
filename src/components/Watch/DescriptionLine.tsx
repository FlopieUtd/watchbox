interface DescriptionLineProps {
  label: string;
  value: string | number;
  postfix?: string;
}

export const DescriptionLine = ({
  label,
  value,
  postfix,
}: DescriptionLineProps) => {
  return (
    <div className="grid grid-cols-2 w-full min-h-[24px] items-center">
      <div className="">{label}</div>
      <div>
        {value} {postfix}
      </div>
    </div>
  );
};
