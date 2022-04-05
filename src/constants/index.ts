import { FilterOption, FilterType } from "src/state";
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
  Bezel,
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
  HAMILTON: "Hamilton",
};

export const CASE_MATERIAL: { [key in CaseMaterial]: string } = {
  STAINLESS_STEEL: "Stainless steel",
  YELLOW_GOLD: "Yellow gold",
  ROSE_GOLD: "Rose gold",
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
  INDICES: "Indices",
};

export const BEZEL: { [key in Bezel]: string } = {
  PLAIN: "Plain",
  COUNT_UP: "Count up",
  COUNT_DOWN: "Count down",
  GMT: "GMT",
  TACHYMETER: "Tachymeter",
  COMPASS: "Compass",
  DECIMAL: "Decimal",
  YACHT_TIMER: "Yacht timer",
  PULSOMETER: "Pulsometer",
  SLIDE_RULE: "Slide rule",
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
  GMT: "GMT",
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

export enum WatchAttributeCategory {
  General = "GENERAL",
  Manufacturer = "MANUFACTURER",
  Caliber = "CALIBER",
  Case = "CASE",
  Dial = "DIAL",
  Bezel = "BEZEL",
  Crystal = "CRYSTAL",
  Complications = "COMPLICATIONS",
}

export interface BaseWatchAttribute {
  name: string;
  accessor: Accessor;
  dict?: Record<string, string>;
  unit?: string;
  isSortable: boolean;
  category: WatchAttributeCategory;
}

export interface CategoryFilterWatchAttribute extends BaseWatchAttribute {
  filterType: FilterType.Category;
  filterOptions: FilterOption[];
}

export interface NoFilterWatchAttribute extends BaseWatchAttribute {
  filterType: FilterType.None;
}

export type WatchAttribute =
  | CategoryFilterWatchAttribute
  | NoFilterWatchAttribute;

export const WATCH_ATTRIBUTE_CATEGORY: {
  [key in WatchAttributeCategory]: string;
} = {
  GENERAL: "General",
  MANUFACTURER: "Manufacturer",
  CALIBER: "Caliber",
  CASE: "Case",
  DIAL: "Dial",
  BEZEL: "Bezel",
  CRYSTAL: "Crystal",
  COMPLICATIONS: "Complications",
};
