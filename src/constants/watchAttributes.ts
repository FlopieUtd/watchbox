import {
  WatchAttribute,
  MANUFACTURER,
  MOVEMENT_TYPE,
  VPH,
  COMPLICATION,
  CASE_MATERIAL,
  DIAL_COLOUR,
  HOUR_MARKERS,
  CRYSTAL_MATERIAL,
  CRYSTAL_SHAPE,
  BEZEL,
  WatchAttributeCategory,
} from "src/constants";
import {
  WatchManufacturer,
  MovementType,
  Complication,
  CaseMaterial,
  DialColour,
  HourMarkers,
  CrystalMaterial,
  CrystalShape,
  Bezel,
  FilterType,
} from "src/types";
import { getRangeFilterOptions } from "src/utils/getRangeFilterOptions";

const alphabetical = (array: string[]) =>
  array.sort((a, b) => a.localeCompare(b));

export const WATCH_ATTRIBUTES: WatchAttribute[] = [
  {
    name: "ID",
    accessor: "id",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.General,
  },
  {
    name: "Manufacturer",
    accessor: "manufacturer",
    dict: MANUFACTURER,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(WatchManufacturer)),
    isSortable: false,
    category: WatchAttributeCategory.Manufacturer,
  },
  {
    name: "Model",
    accessor: "model",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Manufacturer,
  },
  {
    name: "Reference",
    accessor: "reference",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Manufacturer,
  },
  {
    name: "Caliber ID",
    accessor: "caliber.id",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Caliber name",
    accessor: "caliber.name",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Caliber manufacturer",
    accessor: "caliber.manufacturer",
    dict: MANUFACTURER,
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Movement type",
    accessor: "caliber.type",
    dict: MOVEMENT_TYPE,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(MovementType)),
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Power reserve",
    accessor: "caliber.powerReserve",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("caliber.powerReserve"),
    unit: "hours",
    isSortable: true,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Case size",
    accessor: "watchCase.detailedDiameter.size",
    filterType: FilterType.None,
    isSortable: true,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Vibrations per hour",
    accessor: "caliber.vph",
    filterType: FilterType.Category,
    filterOptions: VPH,
    unit: "vph",
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Jewels",
    accessor: "caliber.jewels",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
  },
  {
    name: "Caliber diameter",
    accessor: "caliber.diameter",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
    unit: "mm",
  },
  {
    name: "Caliber thickness",
    accessor: "caliber.thickness",
    filterType: FilterType.None,
    isSortable: false,
    category: WatchAttributeCategory.Caliber,
    unit: "mm",
  },
  {
    name: "Complications",
    accessor: "caliber.complications",
    dict: COMPLICATION,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(Complication)),
    isSortable: false,
    category: WatchAttributeCategory.Complications,
  },
  {
    name: "Case material",
    accessor: "watchCase.material",
    dict: CASE_MATERIAL,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(CaseMaterial)),
    isSortable: false,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Water resistance",
    accessor: "watchCase.waterResistance",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("watchCase.waterResistance"),
    unit: "bar",
    isSortable: true,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Case diameter",
    accessor: "watchCase.diameter",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("watchCase.diameter"),
    unit: "mm",
    isSortable: true,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Case thickness",
    accessor: "watchCase.thickness",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("watchCase.thickness"),
    unit: "mm",
    isSortable: true,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Lug to lug",
    accessor: "watchCase.lugToLug",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("watchCase.lugToLug"),
    unit: "mm",
    isSortable: true,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Lug width",
    accessor: "watchCase.lugWidth",
    filterType: FilterType.Category,
    filterOptions: getRangeFilterOptions("watchCase.lugWidth"),
    unit: "mm",
    isSortable: false,
    category: WatchAttributeCategory.Case,
  },
  {
    name: "Dial colour",
    accessor: "dial.colour",
    dict: DIAL_COLOUR,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(DialColour)),
    isSortable: false,
    category: WatchAttributeCategory.Dial,
  },
  {
    name: "Hour markers",
    accessor: "dial.hourMarkers",
    dict: HOUR_MARKERS,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(HourMarkers)),
    isSortable: false,
    category: WatchAttributeCategory.Dial,
  },
  {
    name: "Bezel",
    accessor: "bezel.type",
    dict: BEZEL,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(Bezel)),
    isSortable: false,
    category: WatchAttributeCategory.Bezel,
  },
  {
    name: "Crystal material",
    accessor: "crystal.material",
    dict: CRYSTAL_MATERIAL,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(CrystalMaterial)),
    isSortable: false,
    category: WatchAttributeCategory.Crystal,
  },
  {
    name: "Crystal shape",
    accessor: "crystal.shape",
    dict: CRYSTAL_SHAPE,
    filterType: FilterType.Category,
    filterOptions: alphabetical(Object.values(CrystalShape)),
    isSortable: false,
    category: WatchAttributeCategory.Crystal,
  },
  {
    name: "Price",
    accessor: "price.amount",
    filterType: FilterType.None,
    isSortable: true,
    category: WatchAttributeCategory.General,
  },
];
