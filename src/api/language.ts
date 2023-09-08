import { Language } from "src/models/Language";
import { getRequestOptions } from "./commun";

export const getLanguages = (): Promise<Array<Language>> => {
  const url = `https://api.themoviedb.org/3/configuration/languages`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};
