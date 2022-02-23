import { ReactNode } from "react";

interface CompareProps {
  children: ReactNode;
}

export const Compare = ({ children }: CompareProps) => {
  return <div className="flex h-[calc(100%-41px)]">{children}</div>;
};
