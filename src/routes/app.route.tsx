import { HomePage } from "../pages/HomePage";
import { PokedexLayout } from "../layouts/PokedexLayout";
import { createHashRouter } from "react-router";

export const appRouter = createHashRouter([
  {
    path: "/",
    element: <PokedexLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
