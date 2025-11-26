import { HomePage } from "../pages/HomePage";
import { PokedexLayout } from "../layouts/PokedexLayout";
import { createBrowserRouter } from "react-router";

export const appRouter = createBrowserRouter([
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
