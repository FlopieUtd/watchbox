import { ReactNode, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isVisible, onClose }: ModalProps) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onClose);

  return isVisible ? (
    <>
      <div className="fixed w-full h-full bg-black top-0 opacity-20"></div>
      <div className="fixed w-full h-full top-0 flex items-center justify-center">
        <div
          className="bg-white rounded-md p-8 cursor-default min-w-[320px] max-h-[90vh] h-auto z-10"
          ref={ref}
        >
          {children}
        </div>
      </div>
    </>
  ) : null;
};
