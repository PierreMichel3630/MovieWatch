import { useRoutes } from "react-router-dom";
import { MovieRoutes } from "./movieRoutes";

export default function ThemeRoutes() {
  return useRoutes([...MovieRoutes]);
}
