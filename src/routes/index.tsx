import { Collect } from "src/components/Collect/Collect";
import { Compare } from "src/components/Compare/Compare";
import { Explore } from "src/components/Explore";
import { Manage } from "src/components/Manage";
import { Watch } from "src/components/Watch/Watch";

export const routes = [
  { path: "/", name: "Explore", element: <Explore /> },
  { path: "/compare", name: "Compare", element: <Compare /> },
  {
    path: "/collect",
    name: "Collect",
    element: <Collect />,
  },
  {
    path: "/watches/:watchId",
    name: "Watch",
    element: <Watch />,
  },
  {
    path: "/manage",
    name: "Manage",
    element: <Manage />,
  },
];
