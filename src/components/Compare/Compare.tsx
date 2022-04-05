import { get } from "lodash";
import { useState } from "react";
import { Button } from "src/components/Button";
import { Catalog } from "src/components/Compare/Catalog";
import { VisualCompareModal } from "src/components/Compare/VisualCompareModal";
import { WatchAttribute, MANUFACTURER } from "src/constants";
import { WATCH_ATTRIBUTES } from "src/constants/watchAttributes";

import { Watch } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";
import { getWatchById } from "src/utils/watches";
import { useLocalStorage } from "usehooks-ts";

interface CompareLineProps {
  watches: Watch[];
  attribute: WatchAttribute;
}

const CompareLine = ({ watches, attribute }: CompareLineProps) => {
  const { name, accessor, dict, unit } = attribute;
  return (
    <tr className="border-b">
      <td className="py-4 pr-16 ">{name}</td>
      {watches.map((watch) => {
        const value = get(watch, accessor);

        if (Array.isArray(value)) {
          return (
            <td key={watch.id} className="max-w-[260px] p-4">
              {value
                .map((v: string | number) => (dict ? dict[v] : v ?? "-"))
                .join(", ")}
            </td>
          );
        }

        return (
          <td key={watch.id} className="max-w-[260px] p-4">
            {dict ? dict[value] : value ?? "-"} {value && unit}
          </td>
        );
      })}
    </tr>
  );
};

export const Compare = () => {
  const [watches, setWatches] = useLocalStorage("compareSlots", [
    getWatchById("sinn--556-010"),
    getWatchById("iwc--iw324010"),
  ]);

  const handleAddWatch = (id: string) => {
    if (watches.find((watch) => watch.id === id)) {
      return;
    }

    setWatches([...watches, getWatchById(id)]);
  };

  const [isVisualCompareModalVisible, setIsVisualCompareModalVisible] =
    useState(false);

  const handleCloseVisualCompareModal = () => {
    setIsVisualCompareModalVisible(false);
  };

  const handleOpenVisualCompareModal = () => {
    setIsVisualCompareModalVisible(true);
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-full flex justify-center overflow-auto">
          {!!watches.length && (
            <table className="mb-8">
              <tbody>
                <tr>
                  <th>
                    <Button onClick={handleOpenVisualCompareModal}>
                      Visual
                    </Button>
                  </th>
                  {watches.map((watch) => {
                    if (!watch.id) {
                      return <th key={watch.id}></th>;
                    }

                    return (
                      <th key={watch.id} className="max-w-[260px] p-4">
                        <div className="flex flex-col items-center">
                          <img
                            className="w-[260px] min-w-[260px]"
                            src={getImageSrc(watch)}
                            alt="alt"
                          />
                          <h2>
                            {MANUFACTURER[watch.manufacturer]} - {watch.model}{" "}
                            <span
                              onClick={() => {
                                setWatches([
                                  ...watches.filter((w) => w.id !== watch.id),
                                ]);
                              }}
                              className="cursor-pointer text-red-500"
                            >
                              remove
                            </span>
                          </h2>
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
                    key={attribute.name}
                    watches={watches}
                    attribute={attribute}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Catalog onAdd={handleAddWatch} />
      </div>
      <VisualCompareModal
        isVisible={isVisualCompareModalVisible}
        onClose={handleCloseVisualCompareModal}
        watches={watches}
      />
    </>
  );
};
