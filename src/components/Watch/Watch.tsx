import classNames from "classnames";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  BEZEL,
} from "src/constants";
import { DiameterType, MovementType } from "src/types";
import { getImageSrc } from "src/utils/getImageSrc";
import { getWatchById, urlSafe } from "src/utils/watches";
import { useElementSize } from "usehooks-ts";

export const Watch = () => {
  const { watchId } = useParams();

  if (!watchId) {
    throw new Error("Invalid route!");
  }
  const watch = getWatchById(watchId);

  const {
    reference,
    manufacturer,
    model,
    caliber,
    watchCase,
    dial,
    crystal,
    bezel,
    description,
    source,
  } = watch;

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
    manufacturer: caliberManufacturer,
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

  const imageOverlayClass = classNames(
    (isDiameterActive || isLugToLugActive || isLugWidthActive) &&
      "transition opacity-20"
  );

  const imageClass = classNames(
    "max-w-full h-full object-scale-down transition w-full md:max-h-[80vh] max-w-[400px] md:max-w-full",
    isImageLoaded && "opacity-100 scale-100",
    !isImageLoaded && "opacity-0 scale-[0.99]"
  );

  const shouldShowReference = reference !== urlSafe(model);

  const [imageRef, { width: imageWidth }] = useElementSize();
  const navigate = useNavigate();

  return (
    <div className="flex-col flex md:flex-row h-full w-full md:justify-center items-center">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hidden h-full border-r p-6 md:flex items-center hover:bg-slate-50"
      >
        <img
          src="icons/chevron_right.svg"
          alt="Back"
          className="rotate-180 w-6"
        />
      </button>
      <div className="relative md:w-[35vw] flex justify-center items-center md:overflow-hidden md:mb-[100px]">
        <div className={imageOverlayClass}>
          <img
            className={imageClass}
            src={getImageSrc(watch)}
            alt={reference}
            ref={imageRef}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
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
      <div className="md:w-[65vw] h-full border-l flex justify-center md:overflow-y-auto">
        <div className="max-w-[760px] w-full m-16">
          <div className="mb-8">
            <div className="text-[28px] leading-[34px]">
              {MANUFACTURER[manufacturer]}
            </div>
            <div className="text-[40px] leading-[48px] font-bold">{model}</div>
            <div className="text-[14px] tracking-widest">
              {shouldShowReference && <>Reference {reference}</>}
              {source && shouldShowReference && " | "}
              {source && (
                <a
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline text-lg"
                >
                  Website
                </a>
              )}
            </div>
          </div>
          {description && (
            <div className="mb-10 text-lg leading-[28px]">
              {description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
          <div className="grid xl:grid-cols-2 gap-4 xl:gap-8 mb-16">
            <div>
              <h2 className="border-b mb-1 pb-1">Caliber</h2>
              <DescriptionLine label="Reference" value={caliberName} />
              <DescriptionLine
                label="Manufacturer"
                value={MANUFACTURER[caliberManufacturer]}
              />
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
            <div>
              <h2 className="border-b mb-1 pb-1">Case</h2>
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
            <div>
              <h2 className="border-b mb-1 pb-1">Dial</h2>
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
            <div>
              <h2 className="border-b mb-1 pb-1">Crystal</h2>
              <DescriptionLine
                label="Material"
                value={CRYSTAL_MATERIAL[crystalMaterial]}
              />
              <DescriptionLine
                label="Flat / domed"
                value={CRYSTAL_SHAPE[crystalShape]}
              />
            </div>
            <div>
              <h2 className="border-b mb-1 pb-1">Complications</h2>
              <div>
                {complications.map((complication) => (
                  <div key={complication}>{COMPLICATION[complication]}</div>
                ))}
              </div>
            </div>
            {}
            <div>
              <h2 className="border-b mb-1 pb-1">Bezel</h2>
              <div>
                <DescriptionLine label="Type" value={BEZEL[bezel.type]} />
              </div>
            </div>
          </div>
          <div className="h-1" />
        </div>
      </div>
    </div>
  );
};
