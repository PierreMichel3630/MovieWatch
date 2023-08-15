import { useRoutes } from "react-router-dom";
import { MovieRoutes } from "./movieRoutes";
import { MainRoutes } from "./mainRoutes";

export default function ThemeRoutes() {
  return useRoutes([...MovieRoutes, ...MainRoutes]);
}
