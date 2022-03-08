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

export enum Complication {
  Tachymetre = "TACHYMETER",
  Alarm = "ALARM",
  Gmt = "GMT",
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

export enum HourMarkerNumerals {
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
  dial: {
    colour: DialColour;
    hourMarkerNumerals: HourMarkerNumerals;
  };
}

export enum CaliberFunction {
  Hours = "HOURS",
  Minutes = "MINUTES",
  CentralSeconds = "CENTRAL_SECONDS",
  SmallSeconds = "SMALL_SECONDS",
  Day = "DAY",
  Date = "DATE",
  PowerReserveIndicator = "POWER_RESERVE_INDICATOR",
  Chronograph = "CHRONOGRAPH",
  MoonPhase = "MOON_PHASE",
  SpringDrive = "SPRING_DRIVE",
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
  functions: CaliberFunction[];
}

export type Vph = 18000 | 19800 | 21600 | 25200 | 28800 | 36000 | 43200 | 72000;
