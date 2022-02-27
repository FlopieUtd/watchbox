export enum Movement {
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
  SmallSeconds = "SMALL_SECONDS",
  PowerReserveIndicator = "powerReserve_INDICATOR",
  Day = "DAY",
  Date = "DATE",
  YearCalendar = "YEAR_CALENDAR",
  MoonPhase = "MOON_PHASE",
  Chronograph = "CHRONOGRAPH",
  HackingSeconds = "HACKING_SECONDS",
  Tachymetre = "TACHYMETER",
  Alarm = "ALARM",
  Gmt = "GMT",
}

export enum Brand {
  Nomos = "NOMOS",
  Junghans = "JUNGHANS",
  Rolex = "ROLEX",
  Traska = "TRASKA",
  Seiko = "SEIKO",
  Sinn = "SINN",
  ALangeSohne = "A_LANGE_SOHNE",
  Doxa = "DOXA",
  Omega = "OMEGA",
  IWC = "IWC",
  PATEK_PHILIPPE = "PATEK_PHILIPPE",
  TAG_HEUER = "TAG_HEUER",
  BREITLING = "BREITLING",
  GRAND_SEIKO = "GRAND_SEIKO",
  JAEGER_LECOULTRE = "JAEGER_LECOULTRE",
}

export enum DiameterType {
  Round = "ROUND",
  Rectangular = "RECTANGULAR",
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
  brand: Brand;
  model: string;
  reference: string;
  movement: {
    type: Movement;
    caliber: string;
    caliberManufacturer: string;
    base: string;
    base_manufacturer: string;
  };
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
    indices: string;
  };
  complications: string[];
}
