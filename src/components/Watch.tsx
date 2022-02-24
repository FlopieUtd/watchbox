import classNames from "classnames";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BRAND, CASE_MATERIAL, MOVEMENT } from "src/constants";
import useMediaQuery from "src/hooks/useMediaQuery";
import { getImageSrc } from "src/utils/getImageSrc";
import { getWatchById } from "src/utils/getWatchById";

interface DescriptionLineProps {
  label: string;
  value: string | number;
  postfix?: string;
}

const DescriptionLine = ({ label, value, postfix }: DescriptionLineProps) => {
  return (
    <div className="grid grid-cols-2 w-full min-h-[24px] items-center">
      <div className="">{label}</div>
      <div>
        {value} {postfix}
      </div>
    </div>
  );
};

const useDiameter = () => {
  const [isDiameterActive, setIsDiameterActive] = useState(false);

  const handleDiameterOn = () => {
    setIsDiameterActive(true);
  };

  const handleDiameterOff = () => {
    setIsDiameterActive(false);
  };

  return { isDiameterActive, handleDiameterOn, handleDiameterOff };
};

export const Watch = () => {
  const { watchId } = useParams();

  if (!watchId) {
    throw new Error("Invalid route!");
  }
  const watch = getWatchById(watchId);

  const { reference, brand, model, movement, watch_case } = watch;

  const {
    diameter,
    thickness,
    lug_to_lug,
    lug_width,
    material,
    water_resistance,
  } = watch_case;

  const { type, caliber } = movement;

  const { isDiameterActive, handleDiameterOn, handleDiameterOff } =
    useDiameter();

  const q1 = useMediaQuery("(min-height: 600px)");
  const q2 = useMediaQuery("(min-height: 800px)");

  const a = "h-[400px]";
  const b = "h-[600px]";
  const c = "h-[800px]";

  const imageWrapperClass = classNames(
    "relative w-full flex justify-center items-center overflow-hidden",
    !q1 && !q2 && a,
    q1 && !q2 && b,
    q2 && c
  );

  const imageClass = classNames(
    "absolute max-w-full h-full object-scale-down transition",
    isDiameterActive && "opacity-20"
  );

  return (
    <div className="flex h-full w-full justify-center items-center">
      <Link
        to="/"
        className="h-full border-r p-6 flex items-center hover:bg-slate-50"
      >
        <img src="/icons/chevron_right.svg" alt="Back" className="rotate-180" />
      </Link>
      <div className={imageWrapperClass}>
        <img className={imageClass} src={getImageSrc(watch)} alt={reference} />

        {isDiameterActive && (
          <div
            className="absolute rounded-full border-2 border-black aspect-square flex items-center justify-center text-xl"
            style={{
              width: `${diameter / 1.03}%`,
            }}
          >
            {diameter} mm
          </div>
        )}

        <div className="flex justify-center absolute bottom-0 w-full">
          <div
            onMouseEnter={handleDiameterOn}
            onMouseLeave={handleDiameterOff}
            className="bg-slate-100 text-slate-500 w-20 h-10 flex justify-center items-center cursor-pointer rounded hover:bg-slate-200"
          >
            diameter
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
                value={water_resistance}
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
                value={lug_to_lug}
                postfix=" mm"
              />
              <DescriptionLine
                label="Lug width"
                value={lug_width}
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
