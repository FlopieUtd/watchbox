import { useEffect, useState } from "react";
import { SliderCompare } from "src/components/Compare/SliderCompare";
import { Modal } from "src/components/Modal";
import { Watch } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";

export interface VisualCompareModalProps {
  isVisible: boolean;
  onClose: () => void;
  watches: (Watch | null)[];
}

export const VisualCompareModal = ({
  isVisible,
  onClose,
  watches,
}: VisualCompareModalProps) => {
  const [active, setActive] = useState<Watch | null>(
    watches.length ? watches[0] : null
  );

  useEffect(() => {
    if (watches.length) {
      setActive(watches[0]);
    }
  }, [watches]);

  if (!active) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="flex h-[85vh] aspect-[2/3] flex-col relative">
        {watches[0] && watches[1] && !watches[2] ? (
          <SliderCompare watch1={watches[0]} watch2={watches[1]} />
        ) : (
          <>
            <div className="h-full">
              <img className="" src={getImageSrc(active)} alt="alt" />
            </div>
            <div className=" absolute flex w-full h-full justify-center bottom-0">
              {watches.map((watch) =>
                watch ? (
                  <div
                    className="w-full flex justify-center p-4"
                    key={watch.id}
                    onMouseOver={() => {
                      setActive(watch);
                    }}
                  >
                    {watch.reference}
                  </div>
                ) : null
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
