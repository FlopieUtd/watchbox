import { MouseEventHandler, ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isVisible, onClose }: ModalProps) => {
  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return isVisible ? (
    <>
      <div className="fixed w-full h-full bg-black top-0 opacity-20"></div>
      <div
        className="fixed w-full h-full top-0 flex items-center justify-center"
        onClick={handleClose}
      >
        <div className="bg-white rounded-md px-8 py-4 cursor-default min-w-[320px]">
          {children}
        </div>
      </div>
    </>
  ) : null;
};
