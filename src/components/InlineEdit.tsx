import { ChangeEventHandler } from "react";

interface InlineEditProps {
  value: string;
  setValue: (value: string) => void;
}

export const InlineEdit = ({ value, setValue }: InlineEditProps) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("waddup");
    setValue(e.target.value);
  };

  return (
    <input
      type="text"
      className="text-3xl hover:bg-slate-100 rounded text-center w-[360px]"
      value={value}
      onChange={handleChange}
    />
  );
};
