import classNames from "classnames";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DescriptionLine } from "src/components/Watch/DescriptionLine";
import {
  useDiameter,
  useLugToLug,
  useLugWidth,
} from "src/components/Watch/hooks";
import { DiameterOverlay } from "src/components/Watch/Overlays/DiameterOverlay";
import { LugToLugOverlay } from "src/components/Watch/Overlays/LugToLugOverlay";
import { LugWidthOverlay } from "src/components/Watch/Overlays/LugWidthOverlay";
import {
  MANUFACTURER,
  CASE_MATERIAL,
  MOVEMENT_TYPE,
  DIAL_COLOUR,
  HOUR_MARKERS,
  CRYSTAL_MATERIAL,
  CRYSTAL_SHAPE,
  COMPLICATION,
} from "src/constants";
import { DiameterType, MovementType } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";
import { getWatchById } from "src/utils/watches";
import { useElementSize } from "usehooks-ts";

export const Watch = () => {
  const { watchId } = useParams();

  if (!watchId) {
    throw new Error("Invalid route!");
  }
  const watch = getWatchById(watchId);

  const { reference, manufacturer, model, caliber, watchCase, dial, crystal } =
    watch;

  const {
    diameter,
    detailedDiameter,
    thickness,
    lugToLug,
    lugWidth,
    material,
    waterResistance,
  } = watchCase;

  const {
    type,
    name: caliberName,
    vph,
    powerReserve,
    jewels,
    complications,
  } = caliber;

  const { material: crystalMaterial, shape: crystalShape } = crystal;

  const { colour, hourMarkers } = dial;

  const { isDiameterActive, handleDiameterOn, handleDiameterOff } =
    useDiameter();
  const { isLugToLugActive, handleLugToLugOn, handleLugToLugOff } =
    useLugToLug();
  const { isLugWidthActive, handleLugWidthOn, handleLugWidthOff } =
    useLugWidth();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const imageOverlayClass = classNames(
    (isDiameterActive || isLugToLugActive || isLugWidthActive) &&
      "transition opacity-20"
  );

  const imageClass = classNames(
    " max-w-full h-full object-scale-down transition max-h-[80vh]",
    isImageLoaded && "opacity-100",
    !isImageLoaded && "opacity-0"
  );

  const [imageRef, { width: imageWidth }] = useElementSize();

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Link
        to="/"
        className="h-full border-r p-6 flex items-center hover:bg-slate-50"
      >
        <img src="/icons/chevron_right.svg" alt="Back" className="rotate-180" />
      </Link>
      <div className="relative w-full flex justify-center items-center overflow-hidden">
        <div className={imageOverlayClass}>
          <img
            className={imageClass}
            src={getImageSrc(watch)}
            alt={reference}
            ref={imageRef}
            onLoad={handleImageLoad}
          />
        </div>
        {isDiameterActive && (
          <DiameterOverlay
            detailedDiameter={detailedDiameter}
            imageWidth={imageWidth}
          />
        )}

        {isLugToLugActive && (
          <LugToLugOverlay
            lugToLug={lugToLug}
            diameter={diameter}
            imageWidth={imageWidth}
          />
        )}

        {isLugWidthActive && (
          <LugWidthOverlay
            lugWidth={lugWidth}
            lugToLug={lugToLug}
            imageWidth={imageWidth}
          />
        )}

        <div className="flex justify-center absolute bottom-0 w-full gap-4">
          <div
            onMouseEnter={handleDiameterOn}
            onMouseLeave={handleDiameterOff}
            className="bg-slate-100 text-slate-500 px-2 py-1 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200"
          >
            Diameter
          </div>
          <div
            onMouseEnter={handleLugToLugOn}
            onMouseLeave={handleLugToLugOff}
            className="bg-slate-100 text-slate-500 px-2 py-1 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200"
          >
            Lug to lug
          </div>
          <div
            onMouseEnter={handleLugWidthOn}
            onMouseLeave={handleLugWidthOff}
            className="bg-slate-100 text-slate-500 px-2 py-1 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200"
          >
            Lug width
          </div>
        </div>
      </div>
      <div className="w-full h-full border-l p-4 flex justify-center">
        <div className="max-w-[480px] w-full">
          <h1>
            {MANUFACTURER[manufacturer]} - {model}
          </h1>
          <div>
            <div className="mb-4">
              <DescriptionLine label="Reference" value={reference} />
            </div>
            <div className="mb-4">
              <h2>Caliber</h2>
              <DescriptionLine label="Reference" value={caliberName} />
              <DescriptionLine label="Type" value={MOVEMENT_TYPE[type]} />
              {type !== MovementType.Quartz && (
                <>
                  <DescriptionLine label="Vibrations per hour" value={vph} />
                  <DescriptionLine
                    label="Power reserve"
                    value={powerReserve}
                    unit="hours"
                  />
                  <DescriptionLine label="Jewels" value={jewels} />
                </>
              )}
            </div>
            <div className="mb-4">
              <h2>Case</h2>
              <DescriptionLine
                label="Material"
                value={CASE_MATERIAL[material]}
              />
              <DescriptionLine
                label="Water resistance"
                value={waterResistance}
                unit=" bar"
              />

              <DescriptionLine
                label="Diameter"
                value={
                  detailedDiameter.type === DiameterType.Round
                    ? diameter
                    : `${detailedDiameter.width} x ${detailedDiameter.height}`
                }
                unit=" mm"
              />
              <DescriptionLine label="Thickness" value={thickness} unit=" mm" />
              <DescriptionLine
                label="Lug to lug width"
                value={lugToLug}
                unit=" mm"
              />
              <DescriptionLine label="Lug width" value={lugWidth} unit=" mm" />
            </div>
            <div className="mb-4">
              <h2>Dial</h2>
              <DescriptionLine
                label="Colour"
                value={
                  typeof colour === "string"
                    ? DIAL_COLOUR[colour]
                    : colour.map((colour) => DIAL_COLOUR[colour]).join(", ")
                }
              />
              <DescriptionLine
                label="Hour markers"
                value={HOUR_MARKERS[hourMarkers]}
              />
            </div>
            <div className="mb-4">
              <h2>Crystal</h2>
              <DescriptionLine
                label="Material"
                value={CRYSTAL_MATERIAL[crystalMaterial]}
              />
              <DescriptionLine
                label="Flat / domed"
                value={CRYSTAL_SHAPE[crystalShape]}
              />
            </div>
            <div className="mb-4">
              <h2>Complications</h2>
              <div>
                {complications.map((complication) => (
                  <div key={complication}>{COMPLICATION[complication]}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
