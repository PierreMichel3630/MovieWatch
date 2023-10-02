import { getRequestOptions } from "./commun";
import { Country } from "src/models/Country";

export const getCountries = (language: string): Promise<Array<Country>> => {
  const url = `https://api.themoviedb.org/3/configuration/countries?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};
