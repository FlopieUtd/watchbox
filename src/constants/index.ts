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

export const MOVEMENT: { [key in MovementType]: string } = {
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
  ARABIC: "Arabic",
  ROMAN: "Roman",
  MIXED: "Mixed",
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
