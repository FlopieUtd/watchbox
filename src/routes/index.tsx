import { Box } from "src/components/Box";
import { Explore } from "src/components/Explore";
import { Watch } from "src/components/Watch/Watch";

export const routes = [
  { path: "/", name: "Explore", element: <Explore /> },
  { path: "/compare", name: "Compare", element: <Explore /> },
  { path: "/collect", name: "Collect", element: <Box rows={1} columns={3} /> },
  {
    path: "/watches/:watchId",
    name: "Watch",
    element: <Watch />,
  },
];
