import { FilterOption, FilterType } from "src/filters";
import {
  WatchManufacturer,
  CaseMaterial,
  DialColour,
  DiameterType,
  HourMarkers,
  MovementType,
  Complication,
  CrystalMaterial,
  CrystalShape,
  Vph,
  Accessor,
} from "src/types";

export const SIDE_PANEL_WIDTH = 280;

export const MANUFACTURER: { [key in WatchManufacturer]: string } = {
  NOMOS: "Nomos",
  JUNGHANS: "Junghans",
  ROLEX: "Rolex",
  TRASKA: "Traska",
  SEIKO: "Seiko",
  SINN: "Sinn",
  A_LANGE_SOHNE: "A. Lange & Söhne",
  DOXA: "Doxa",
  OMEGA: "Omega",
  IWC: "IWC",
  PATEK_PHILIPPE: "Patek Philippe",
  TAG_HEUER: "TAG Heuer",
  BREITLING: "Breitling",
  GRAND_SEIKO: "Grand Seiko",
  JAEGER_LECOULTRE: "Jaeger-LeCoultre",
  CASIO: "Casio",
  CARTIER: "Cartier",
  PANERAI: "Panerai",
  TUDOR: "Tudor",
  AUDEMARS_PIGUET: "Audemars Piguet",
  GLASHUTTE_ORIGINAL: "Glashütte Original",
  TISSOT: "Tissot",
  BULGARI: "BVLGARI",
  VACHERON_CONSTANTIN: "Vacheron Constantin",
};

export const CASE_MATERIAL: { [key in CaseMaterial]: string } = {
  STAINLESS_STEEL: "Stainless steel",
  GOLD: "Gold",
  BRONZE: "Bronze",
  TITANIUM: "Titanium",
};

export const DIAMETER_TYPE: { [key in DiameterType]: string } = {
  ROUND: "Round",
  RECTANGULAR: "Rectangular",
};

export const MOVEMENT_TYPE: { [key in MovementType]: string } = {
  MANUAL_WIND: "Manual wind",
  AUTOMATIC: "Automatic",
  QUARTZ: "Quartz",
};

export const DIAL_COLOUR: { [key in DialColour]: string } = {
  BLACK: "Black",
  WHITE: "White / silver",
  GREY: "Grey",
  BLUE: "Blue",
  GREEN: "Green",
  RED: "Red",
  ORANGE: "Orange",
  YELLOW: "Yellow",
  PINK: "Pink",
  BRONZE: "Bronze",
  BROWN: "Brown",
  GOLD: "Gold",
  MOTHER_OF_PEARL: "Mother of pearl",
  TRANSPARENT: "Transparent",
  PURPLE: "Purple",
  CHAMPAGNE: "Champagne",
};

export const HOUR_MARKERS: { [key in HourMarkers]: string } = {
  ARABIC: "Arabic numerals",
  ROMAN: "Roman numerals",
  MIXED: "Mixed numerals",
  NO_NUMERALS: "No numerals",
};

export const COMPLICATION: { [key in Complication]: string } = {
  HOURS: "Hours",
  MINUTES: "Minutes",
  CENTRAL_SECONDS: "Central seconds",
  SMALL_SECONDS: "Small seconds",
  DAY: "Day",
  DATE: "Date",
  BIG_DATE: "Big date",
  POWER_RESERVE_INDICATOR: "Power reserve indicator",
  CHRONOGRAPH: "Chronograph",
  MOON_PHASE: "Moon phase",
  SECOND_TIME_ZONE: "Second time zone",
  AM_PM: "AM / PM",
  HACKING_SECONDS: "Hacking seconds",
};

export const CRYSTAL_MATERIAL: { [key in CrystalMaterial]: string } = {
  ACRYLIC: "Acrylic",
  MINERAL: "Mineral",
  SAPPHIRE: "Sapphire",
};

export const CRYSTAL_SHAPE: { [key in CrystalShape]: string } = {
  FLAT: "Flat",
  DOMED: "Domed",
};

export const VPH: Vph[] = [
  18000, 19800, 21600, 25200, 28800, 36000, 43200, 72000,
];

export interface BaseWatchAttribute {
  name: string;
  accessor: Accessor;
  dict?: Record<string, string>;
  unit?: string;
}

export interface CategoryFilterWatchAttribute extends BaseWatchAttribute {
  filterType: FilterType.Category;
  filterOptions: FilterOption[];
}

export interface RangeFilterWatchAttribute extends BaseWatchAttribute {
  filterType: FilterType.Range;
  unit?: string;
  step: number;
}

export interface NoFilterWatchAttribute extends BaseWatchAttribute {
  filterType: FilterType.None;
}

export type AnyWatchAttribute =
  | CategoryFilterWatchAttribute
  | RangeFilterWatchAttribute
  | NoFilterWatchAttribute;

export const WATCH_ATTRIBUTES: AnyWatchAttribute[] = [
  {
    name: "ID",
    accessor: "id",
    filterType: FilterType.None,
  },
  {
    name: "Manufacturer",
    accessor: "manufacturer",
    dict: MANUFACTURER,
    filterType: FilterType.Category,
    filterOptions: Object.values(WatchManufacturer),
  },
  {
    name: "Model",
    accessor: "model",
    filterType: FilterType.None,
  },
  {
    name: "Reference",
    accessor: "reference",
    filterType: FilterType.None,
  },
  {
    name: "Caliber ID",
    accessor: "caliber.id",
    filterType: FilterType.None,
  },
  {
    name: "Caliber name",
    accessor: "caliber.name",
    filterType: FilterType.None,
  },
  {
    name: "Caliber manufacturer",
    accessor: "caliber.manufacturer",
    dict: MANUFACTURER,
    filterType: FilterType.None,
  },
  {
    name: "Movement type",
    accessor: "caliber.type",
    dict: MOVEMENT_TYPE,
    filterType: FilterType.Category,
    filterOptions: Object.values(MovementType),
  },
  {
    name: "Power reserve",
    accessor: "caliber.powerReserve",
    filterType: FilterType.Range,
    unit: "hours",
    step: 1,
  },
  {
    name: "Vibrations per hour",
    accessor: "caliber.vph",
    filterType: FilterType.Category,
    filterOptions: VPH,
  },
  {
    name: "Jewels",
    accessor: "caliber.jewels",
    filterType: FilterType.Range,
    step: 1,
  },
  {
    name: "Caliber diameter",
    accessor: "caliber.diameter",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Caliber thickness",
    accessor: "caliber.thickness",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Complications",
    accessor: "caliber.complications",
    dict: COMPLICATION,
    filterType: FilterType.Category,
    filterOptions: Object.values(Complication),
  },
  {
    name: "Case material",
    accessor: "watchCase.material",
    dict: CASE_MATERIAL,
    filterType: FilterType.Category,
    filterOptions: Object.values(CaseMaterial),
  },
  {
    name: "Water resistance",
    accessor: "watchCase.waterResistance",
    filterType: FilterType.Range,
    unit: "bar",
    step: 0.5,
  },
  {
    name: "Case diameter",
    accessor: "watchCase.diameter",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Case thickness",
    accessor: "watchCase.thickness",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Lug to lug",
    accessor: "watchCase.lugToLug",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Lug width",
    accessor: "watchCase.lugWidth",
    filterType: FilterType.Range,
    unit: "mm",
    step: 0.5,
  },
  {
    name: "Dial colour",
    accessor: "dial.colour",
    dict: DIAL_COLOUR,
    filterType: FilterType.Category,
    filterOptions: Object.values(DialColour),
  },
  {
    name: "Hour markers",
    accessor: "dial.hourMarkers",
    dict: HOUR_MARKERS,
    filterType: FilterType.Category,
    filterOptions: Object.values(HourMarkers),
  },
  {
    name: "Crystal material",
    accessor: "crystal.material",
    dict: CRYSTAL_MATERIAL,
    filterType: FilterType.Category,
    filterOptions: Object.values(CrystalMaterial),
  },
  {
    name: "Crystal shape",
    accessor: "crystal.shape",
    dict: CRYSTAL_SHAPE,
    filterType: FilterType.Category,
    filterOptions: Object.values(CrystalShape),
  },
];
