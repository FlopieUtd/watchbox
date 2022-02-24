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
}

export enum Complication {
  SmallSeconds = "SMALL_SECONDS",
  PowerReserveIndicator = "POWER_RESERVE_INDICATOR",
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
}

export interface Watch {
  id: string;
  brand: Brand;
  model: string;
  reference: string;
  movement: {
    type: Movement;
    caliber: string;
    caliber_manufacturer: string;
    base: string;
    base_manufacturer: string;
  };
  watch_case: {
    material: CaseMaterial;
    water_resistance: 3;
    diameter: 42.5;
    thickness: 14;
    lug_to_lug: 50.5;
    lug_width: 22;
  };
  dial: {
    colour: DialColour;
    indices: string;
  };
  complications: string[];
}
