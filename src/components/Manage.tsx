import { FormEventHandler, useState } from "react";
import {
  MANUFACTURER,
  CASE_MATERIAL,
  DIAL_COLOUR,
  DIAMETER_TYPE,
  HOUR_MARKER_NUMERALS,
  MOVEMENT,
} from "src/constants";
import {
  CaseMaterial,
  DialColour,
  DiameterType,
  HourMarkerNumerals,
  MovementType,
  WatchManufacturer,
} from "src/types";
import { getWatchId } from "src/utils/watches";

export const Manage = () => {
  const [manufacturer, setManufacturer] = useState<WatchManufacturer | null>(
    null
  );
  const [model, setModel] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [movementType, setMovementType] = useState<MovementType | null>(null);
  const [caliber, setCaliber] = useState<string | null>(null);
  const [caliberManufacturer, setCaliberManufacturer] = useState<string | null>(
    null
  );
  const [material, setMaterial] = useState<string | null>(null);
  const [waterResistance, setWaterResistance] = useState<number | null>(null);
  const [thickness, setThickness] = useState<number | null>(null);
  const [lugToLug, setLugToLug] = useState<number | null>(null);
  const [lugWidth, setLugWidth] = useState<number | null>(null);
  const [diameterType, setDiameterType] = useState<DiameterType>(
    DiameterType.Round
  );
  const [diameter, setDiameter] = useState<number | null>(null);
  const [diameterWidth, setDiameterWidth] = useState<number | null>(null);
  const [diameterHeight, setDiameterHeight] = useState<number | null>(null);
  const [dialColour, setDialColour] = useState<DialColour | null>(null);
  const [hourMarkerNumerals, setHourMarkerNumerals] =
    useState<HourMarkerNumerals | null>(null);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (!manufacturer || !reference) {
      return;
    }

    const result = {
      id: getWatchId({ manufacturer, reference }),
      manufacturer,
      model,
      reference,
      movement: {
        type: movementType,
        caliber,
        manufacturer: caliberManufacturer,
      },
      watch_case: {
        material,
        waterResistance,
        thickness,
        lugToLug,
        lugWidth,
        diameter:
          diameterType === DiameterType.Round ? diameter : diameterWidth,
        detailedDiameter: {
          type: diameterType,
          ...(diameterType === DiameterType.Round
            ? { diameter }
            : { width: diameterWidth, height: diameterHeight }),
        },
      },
      dial: {
        colour: dialColour,
        hourMarkerNumerals,
      },
    };
  };

  return (
    <div className="p-4">
      <h1>Manage</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <div>Manufacturer</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setManufacturer(e.target.value as WatchManufacturer);
            }}
          >
            {Object.values(WatchManufacturer).map((b) => (
              <option key={b} value={b}>
                {MANUFACTURER[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <div>Model</div>
          <input
            type="text"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Reference</div>
          <input
            type="text"
            onChange={(e) => {
              setReference(e.target.value);
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <h2>Movement</h2>

        <div className="mb-2">
          <div>Movement type</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setMovementType(e.target.value as MovementType);
            }}
          >
            {Object.values(MovementType).map((b) => (
              <option key={b} value={b}>
                {MOVEMENT[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <div>Movement caliber</div>
          <input
            type="text"
            onChange={(e) => {
              setCaliber(e.target.value);
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Caliber manufacturer</div>
          <input
            type="text"
            onChange={(e) => {
              setCaliberManufacturer(e.target.value);
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <h2>Case</h2>

        <div className="mb-2">
          <div>Material</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setMaterial(e.target.value as CaseMaterial);
            }}
          >
            {Object.values(CaseMaterial).map((b) => (
              <option key={b} value={b}>
                {CASE_MATERIAL[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <div>Water resistance</div>
          <input
            type="number"
            onChange={(e) => {
              setWaterResistance(Number(e.target.value));
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Thickness</div>
          <input
            type="number"
            onChange={(e) => {
              setThickness(Number(e.target.value));
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Lug to lug</div>
          <input
            type="number"
            onChange={(e) => {
              setLugToLug(Number(e.target.value));
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Lug width</div>
          <input
            type="number"
            onChange={(e) => {
              setLugWidth(Number(e.target.value));
            }}
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
          />
        </div>

        <div className="mb-2">
          <div>Diameter type</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setDiameterType(e.target.value as DiameterType);
            }}
          >
            {Object.values(DiameterType).map((b) => (
              <option key={b} value={b}>
                {DIAMETER_TYPE[b]}
              </option>
            ))}
          </select>
        </div>

        {diameterType === DiameterType.Rectangular ? (
          <>
            <div className="mb-2">
              <div>Width</div>
              <input
                type="number"
                onChange={(e) => {
                  setDiameterWidth(Number(e.target.value));
                }}
                className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
              />
            </div>

            <div className="mb-2">
              <div>Height</div>
              <input
                type="number"
                onChange={(e) => {
                  setDiameterHeight(Number(e.target.value));
                }}
                className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
              />
            </div>
          </>
        ) : (
          <div className="mb-2">
            <div>Diameter</div>
            <input
              type="number"
              onChange={(e) => {
                setDiameter(Number(e.target.value));
              }}
              className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            />
          </div>
        )}

        <h2>Dial</h2>

        <div className="mb-2">
          <div>Dial colour</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setDialColour(e.target.value as DialColour);
            }}
          >
            {Object.values(DialColour).map((b) => (
              <option key={b} value={b}>
                {DIAL_COLOUR[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <div>Hour marker numerals</div>
          <select
            className="border w-72 rounded-sm px-1 py-1 min-h-[30px]"
            onChange={(e) => {
              setHourMarkerNumerals(e.target.value as HourMarkerNumerals);
            }}
          >
            {Object.values(HourMarkerNumerals).map((b) => (
              <option key={b} value={b}>
                {HOUR_MARKER_NUMERALS[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="pb-4">
          <input
            type="submit"
            className="bg-slate-200 px-4 py-1 rounded-sm cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};
