import classNames from "classnames";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const Button = ({ children, onClick, className }: ButtonProps) => {
  const buttonClass = classNames(
    "bg-slate-100 hover:bg-slate-200 text-slate-500 active:bg-slate-300 transition rounded h-10 px-8",
    {
      [`${className}`]: className,
    }
  );

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
