import {
  WatchManufacturer,
  CaseMaterial,
  DialColour,
  DiameterType,
  HourMarkerNumerals,
  MovementType,
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

export const HOUR_MARKER_NUMERALS: { [key in HourMarkerNumerals]: string } = {
  ARABIC: "Arabic",
  ROMAN: "Roman",
  MIXED: "Mixed",
  NO_NUMERALS: "No numerals",
};
