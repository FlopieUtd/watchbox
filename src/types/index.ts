export enum MovementType {
  ManualWind = "MANUAL_WIND",
  Automatic = "AUTOMATIC",
  Quartz = "QUARTZ",
}

export enum CaseMaterial {
  StainlessSteel = "STAINLESS_STEEL",
  Gold = "GOLD",
  Bronze = "BRONZE",
  Titanium = "TITANIUM",
}

export enum CrystalMaterial {
  Acrylic = "ACRYLIC",
  Mineral = "MINERAL",
  Sapphire = "SAPPHIRE",
}

export enum CrystalShape {
  Flat = "FLAT",
  Domed = "DOMED",
}

export enum DialColour {
  Black = "BLACK",
  White = "WHITE",
  Grey = "GREY",
  Blue = "BLUE",
  Green = "GREEN",
  Red = "RED",
  Orange = "ORANGE",
  Yellow = "YELLOW",
  Pink = "PINK",
  Bronze = "BRONZE",
  Brown = "BROWN",
  Gold = "GOLD",
  MotherOfPearl = "MOTHER_OF_PEARL",
  Transparent = "TRANSPARENT",
  Purple = "PURPLE",
  Champagne = "CHAMPAGNE",
}

export enum WatchManufacturer {
  Nomos = "NOMOS",
  Junghans = "JUNGHANS",
  Rolex = "ROLEX",
  Traska = "TRASKA",
  Seiko = "SEIKO",
  Sinn = "SINN",
  ALangeSohne = "A_LANGE_SOHNE",
  Doxa = "DOXA",
  Omega = "OMEGA",
  Iwc = "IWC",
  PatekPhilippe = "PATEK_PHILIPPE",
  TagHeuer = "TAG_HEUER",
  Breitling = "BREITLING",
  GrandSeiko = "GRAND_SEIKO",
  JaegerLecoultre = "JAEGER_LECOULTRE",
  Casio = "CASIO",
  Cartier = "CARTIER",
  Panerai = "PANERAI",
  Tudor = "TUDOR",
  AUDEMARS_PIGUET = "AUDEMARS_PIGUET",
  GLASHUTTE_ORIGINAL = "GLASHUTTE_ORIGINAL",
  TISSOT = "TISSOT",
  BULGARI = "BULGARI",
  VACHERON_CONSTANTIN = "VACHERON_CONSTANTIN",
}

export enum CaliberManufacturer {
  Miyota = "MIYOTA",
  Eta = "ETA",
  Sellita = "SELLITA",
}

export enum DiameterType {
  Round = "ROUND",
  Rectangular = "RECTANGULAR",
}

export enum HourMarkers {
  Arabic = "ARABIC",
  Roman = "ROMAN",
  Mixed = "MIXED",
  NoNumerals = "NO_NUMERALS",
}

export enum Country {
  Switzerland = "SWITZERLAND",
  Germany = "GERMANY",
  Japan = "JAPAN",
}

export interface RoundDiameter {
  type: DiameterType.Round;
  diameter: number;
}

export interface RectangularDiameter {
  type: DiameterType.Rectangular;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
}

export type DetailedDiameter = RoundDiameter | RectangularDiameter;

export interface Watch {
  id: string;
  manufacturer: WatchManufacturer;
  model: string;
  reference: string;
  caliber: Caliber;
  watchCase: {
    material: CaseMaterial;
    waterResistance: number;
    diameter: number;
    detailedDiameter: DetailedDiameter;
    thickness: number;
    lugToLug: number;
    lugWidth: number;
  };
  crystal: {
    material: CrystalMaterial;
    shape: CrystalShape;
  };
  dial: {
    colour: DialColour | DialColour[];
    hourMarkers: HourMarkers;
  };
}

export enum Complication {
  Hours = "HOURS",
  Minutes = "MINUTES",
  CentralSeconds = "CENTRAL_SECONDS",
  SmallSeconds = "SMALL_SECONDS",
  Day = "DAY",
  Date = "DATE",
  BigDate = "BIG_DATE",
  PowerReserveIndicator = "POWER_RESERVE_INDICATOR",
  Chronograph = "CHRONOGRAPH",
  MoonPhase = "MOON_PHASE",
  SecondTimeZone = "SECOND_TIME_ZONE",
  AmPm = "AM_PM",
}

export interface Caliber {
  id: string;
  name: string;
  manufacturer: WatchManufacturer | CaliberManufacturer;
  type: MovementType;
  powerReserve: number;
  vph: Vph;
  hackingSeconds: boolean;
  jewels: number;
  diameter: number;
  thickness: number;
  functions: Complication[];
}

export type Vph = 18000 | 19800 | 21600 | 25200 | 28800 | 36000 | 43200 | 72000;
