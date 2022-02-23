import { ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

export const Page = ({ children }: PageProps) => {
  return <div className="flex w-full h-[calc(100%-41px)]">{children}</div>;
};
