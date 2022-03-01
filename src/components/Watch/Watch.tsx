import classNames from "classnames";
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
import { BRAND, CASE_MATERIAL, MOVEMENT } from "src/constants";
import { getImageSrc } from "src/utils/getImageSrc";
import { getWatchById } from "src/utils/getWatchById";
import { useElementSize } from "usehooks-ts";

export const Watch = () => {
  const { watchId } = useParams();

  if (!watchId) {
    throw new Error("Invalid route!");
  }
  const watch = getWatchById(watchId);

  const { reference, brand, model, movement, watchCase } = watch;

  const {
    diameter,
    detailedDiameter,
    thickness,
    lugToLug,
    lugWidth,
    material,
    waterResistance,
  } = watchCase;

  const { type, caliber } = movement;

  const { isDiameterActive, handleDiameterOn, handleDiameterOff } =
    useDiameter();
  const { isLugToLugActive, handleLugToLugOn, handleLugToLugOff } =
    useLugToLug();
  const { isLugWidthActive, handleLugWidthOn, handleLugWidthOff } =
    useLugWidth();

  const imageClass = classNames(
    " max-w-full h-full object-scale-down transition max-h-[80vh]",
    (isDiameterActive || isLugToLugActive || isLugWidthActive) && "opacity-20"
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
        <img
          className={imageClass}
          src={getImageSrc(watch)}
          alt={reference}
          ref={imageRef}
        />
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
            {BRAND[brand]} - {model}
          </h1>
          <div>
            <div className="mb-4">
              <h2>General</h2>
              <DescriptionLine label="Brand" value={BRAND[brand]} />
              <DescriptionLine label="Model" value={model} />
              <DescriptionLine label="Reference" value={reference} />
            </div>
            <div className="mb-4">
              <h2>Movement</h2>
              <DescriptionLine label="Type" value={MOVEMENT[type]} />
              <DescriptionLine label="Caliber" value={caliber} />
            </div>
            <div className="mb-4">
              <h2>Case</h2>
              <DescriptionLine
                label="Case material"
                value={CASE_MATERIAL[material]}
              />
              <DescriptionLine
                label="Water resistance"
                value={waterResistance}
                postfix=" bar"
              />

              <DescriptionLine
                label="Case diameter"
                value={diameter}
                postfix=" mm"
              />
              <DescriptionLine
                label="Case thickness"
                value={thickness}
                postfix=" mm"
              />
              <DescriptionLine
                label="Lug to lug width"
                value={lugToLug}
                postfix=" mm"
              />
              <DescriptionLine
                label="Lug width"
                value={lugWidth}
                postfix=" mm"
              />
            </div>
            <div className="mb-4">
              <h2>Dial</h2>
              <DescriptionLine label="Type" value={MOVEMENT[type]} />
              <DescriptionLine label="Caliber" value={caliber} />
            </div>
            <div className="mb-4">
              <h2>Complications</h2>
              <DescriptionLine label="Type" value={MOVEMENT[type]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
