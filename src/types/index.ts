export enum MovementType {
  ManualWind = "MANUAL_WIND",
  Automatic = "AUTOMATIC",
  Quartz = "QUARTZ",
}

export enum CaseMaterial {
  StainlessSteel = "STAINLESS_STEEL",
  YellowGold = "YELLOW_GOLD",
  RoseGold = "ROSE_GOLD",
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
  HAMILTON = "HAMILTON",
  ZENITH = "ZENITH",
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
  Indices = "INDICES",
}

export enum Bezel {
  Plain = "PLAIN",
  CountUp = "COUNT_UP",
  CountDown = "COUNT_DOWN",
  GMT = "GMT",
  Tachymeter = "TACHYMETER",
  Compass = "COMPASS",
  Decimal = "DECIMAL",
  YachtTimer = "YACHT_TIMER",
  Pulsometer = "PULSOMETER",
  SlideRule = "SLIDE_RULE",
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
  price: {
    amount: number;
    date: string;
    msrp: boolean;
  } | null;
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
  HackingSeconds = "HACKING_SECONDS",
  GMT = "GMT",
}

export interface Caliber {
  id: string;
  name: string;
  manufacturer: WatchManufacturer | CaliberManufacturer;
  type: MovementType;
  powerReserve: number;
  vph: Vph;
  jewels: number;
  diameter: number;
  thickness: number;
  complications: Complication[];
}

export type Vph = 18000 | 19800 | 21600 | 25200 | 28800 | 36000 | 43200 | 72000;

export type Accessor =
  | "id"
  | "manufacturer"
  | "model"
  | "reference"
  | "caliber.id"
  | "caliber.name"
  | "caliber.manufacturer"
  | "caliber.type"
  | "caliber.powerReserve"
  | "caliber.vph"
  | "caliber.jewels"
  | "caliber.diameter"
  | "caliber.thickness"
  | "caliber.complications"
  | "watchCase.material"
  | "watchCase.waterResistance"
  | "watchCase.diameter"
  | "watchCase.detailedDiameter"
  | "watchCase.detailedDiameter.size"
  | "watchCase.thickness"
  | "watchCase.lugToLug"
  | "watchCase.lugWidth"
  | "watchCase.bezel"
  | "dial.colour"
  | "dial.hourMarkers"
  | "crystal.material"
  | "crystal.shape"
  | "price.amount";

export type FilterOption = string | number;

export enum FilterType {
  Category = "CATEGORY",
  Search = "SEARCH",
  None = "NONE",
}

export interface BaseFilter {
  name: string;
  accessor: string;
  type: FilterType;
}
