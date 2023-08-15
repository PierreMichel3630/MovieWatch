import { Login } from "src/pages/Login";
import { Register } from "src/pages/Register";

export const MainRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
