import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button";
import { AddWatchModal } from "src/components/Compare/AddWatchModal";
import { CompareLine } from "src/components/Compare/CompareLine";
import { VisualCompareModal } from "src/components/Compare/VisualCompareModal";
import { MANUFACTURER } from "src/constants";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";
import { useModal } from "src/hooks/useModal";

import { Watch } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";
import { useLocalStorage } from "usehooks-ts";

export const Compare = () => {
  const [watches, setWatches] = useLocalStorage<(Watch | null)[]>(
    "compareSlots",
    [null, null]
  );
  const [addIndex, setAddIndex] = useState<number>(0);

  const {
    isModalVisible: isAddModalVisible,
    handleCloseModal: handleCloseAddModal,
    handleOpenModal: handleOpenAddModal,
  } = useModal();

  const {
    isModalVisible: isCompareModalVisible,
    handleCloseModal: handleCloseCompareModal,
    handleOpenModal: handleOpenCompareModal,
  } = useModal();

  const handleOpenAddWatchModal = (index: number) => {
    setAddIndex(index);
    handleOpenAddModal();
  };

  const handleAddWatch = (watch: Watch) => {
    setWatches(Object.assign([], watches, { [addIndex]: watch }));
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex justify-center overflow-auto">
          {
            <table className="mb-16">
              <tbody>
                <tr>
                  <th></th>
                  {watches.map((watch, index) => {
                    if (!watch) {
                      return (
                        <th className="h-[480px] w-[280px] relative">
                          <button
                            onClick={() => {
                              handleOpenAddWatchModal(index);
                            }}
                            className="w-full h-full flex flex-col justify-between items-center"
                          >
                            <img
                              className="w-full relative top-[-20px]"
                              src="/images/placeholder.jpg"
                              alt="alt"
                            />
                            <div className="absolute bottom-4 h-20 flex flex-col justify-between items-center">
                              Add watch
                            </div>
                          </button>
                        </th>
                      );
                    }

                    return (
                      <th
                        key={watch.id}
                        className="h-[480px] w-[280px] relative"
                      >
                        <div className="w-full h-full flex flex-col justify-between items-center">
                          <img
                            className="w-full cursor-zoom-in absolute top-[-20px]"
                            src={getImageSrc(watch)}
                            alt="alt"
                            onClick={handleOpenCompareModal}
                          />

                          <div className="absolute bottom-4 flex flex-col justify-between items-center px-2">
                            <Link
                              to={`/watches/${watch.id}`}
                              className="hover:underline text-[16px]"
                            >
                              {MANUFACTURER[watch.manufacturer]} - {watch.model}
                            </Link>
                            <Button
                              onClick={() => {
                                setWatches(
                                  watches.map((w) =>
                                    w?.id === watch.id ? null : w
                                  )
                                );
                              }}
                              className="h-8 mt-4"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
                {WATCH_ATTRIBUTES.filter(
                  (attribute) =>
                    !["ID", "Manufacturer", "Model", "Caliber ID"].includes(
                      attribute.name
                    )
                ).map((attribute) => (
                  <CompareLine
                    key={`${attribute.category}-${attribute.name}`}
                    watches={watches}
                    attribute={attribute}
                  />
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
      <VisualCompareModal
        isVisible={isCompareModalVisible}
        onClose={handleCloseCompareModal}
        watches={watches}
      />
      <AddWatchModal
        isVisible={isAddModalVisible}
        onClose={handleCloseAddModal}
        onAdd={handleAddWatch}
      />
    </>
  );
};
