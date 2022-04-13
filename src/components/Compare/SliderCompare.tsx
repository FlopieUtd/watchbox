import { MouseEventHandler, useCallback, useRef, useState } from "react";
import { Watch } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";

interface SliderCompareProps {
  watch1: Watch;
  watch2: Watch;
}

const HANDLE_WIDTH = 40;

export const SliderCompare = ({ watch1, watch2 }: SliderCompareProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!isResizing) {
        return;
      }
      const rect = containerRef?.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const containerWidth = rect.right - rect.left;
      const containerPosition = e.clientX - rect.left;
      const percentage = (100 / containerWidth) * containerPosition;
      setSliderPosition(percentage);
    },
    [isResizing]
  );

  return (
    <div
      className="w-full h-full relative group"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="w-full h-full">
        <img
          src={getImageSrc(watch2)}
          className="h-full object-cover object-left select-none"
        />
      </div>
      <div
        className="absolute overflow-hidden h-full top-0"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="w-full h-full relative">
          <img
            src={getImageSrc(watch1)}
            className="h-full object-cover object-left select-none"
          />
        </div>
      </div>
      <div
        className="absolute h-full top-0 cursor-ew-resize flex justify-center items-center"
        style={{
          left: `calc(${sliderPosition}% - ${HANDLE_WIDTH / 2}px)`,
          width: HANDLE_WIDTH,
        }}
        onMouseDown={() => {
          setIsResizing(true);
        }}
        onMouseUp={() => {
          setIsResizing(false);
        }}
      >
        <div className="absolute hidden gap-[10px] bg-[rgba(0,0,0,0.6)] w-12 h-12 items-center justify-center rounded-full group-hover:flex">
          <div className="width-[0px] height-[0px] border-t-[6px] border-t-transparent border-b-transparent border-b-[6px] border-r-[6px] border-white"></div>
          <div className="width-[0px] height-[0px] border-t-[6px] border-t-transparent border-b-transparent border-b-[6px] border-l-[6px] border-white"></div>
        </div>
      </div>
    </div>
  );
};
