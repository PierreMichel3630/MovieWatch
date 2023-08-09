import { PersonDetails } from "src/models/tmdb/person/PersonDetails";
import { getRequestOptions } from "./commun";
import { PersonCredits } from "src/models/tmdb/person/PersonCredits";
import { PersonImage } from "src/models/tmdb/person/PersonImage";
import { SearchResult } from "src/models/tmdb/commun/SearchResult";

export const getPersonDetails = (
  id: number,
  language: string
): Promise<PersonDetails> => {
  const url = `https://api.themoviedb.org/3/person/${id}?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

export const getPersonMovieCredit = (
  id: number,
  language: string
): Promise<PersonCredits> => {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

export const getPersonTVCredit = (
  id: number,
  language: string
): Promise<PersonCredits> => {
  const url = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

export const getPersonImage = (id: number): Promise<PersonImage> => {
  let url = `https://api.themoviedb.org/3/person/${id}/images`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

export const getPersonTrending = (
  page: number,
  language: string
): Promise<SearchResult> => {
  const url = `https://api.themoviedb.org/3/trending/person/week?language=${language}&page=${page}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};
