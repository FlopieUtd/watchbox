import { Compare } from "src/components/Compare/Compare";
import { Explore } from "src/components/Explore";
import { Watch } from "src/components/Watch/Watch";

export const routes = [
  { path: "/", name: "Explore", element: <Explore /> },
  { path: "/compare", name: "Compare", element: <Compare /> },
  {
    path: "/watches/:watchId",
    name: "Watch",
    element: <Watch />,
  },
];
