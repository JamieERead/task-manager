import { createBrowserRouter } from "react-router-dom";
import Board from "./pages/Board";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/board/:id",
    element: <Board />,
  },
]);
