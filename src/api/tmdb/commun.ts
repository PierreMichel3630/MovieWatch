import { Genres } from "src/models/tmdb/commun/Genres";
import { SearchResult } from "src/models/tmdb/commun/SearchResult";

export const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjZjYTY3NDEyY2U3MzA4MGE4YWM1YzhjMDQwOTZiNSIsInN1YiI6IjY0YmJkY2M0ZWI3OWMyMDExYzI0ZTEwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0geOpDej0t0qVeEp5qvXPv-UW9ao9Cmfkv2aQYyF_UA";

export const getRequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

// SEARCH
export const searchAll = (
  query: string,
  language: string,
  page: number
): Promise<SearchResult> => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${query}&language=${language}&page=${page}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

// GENRE

export const getMovieGenre = (language: string): Promise<Genres> => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

export const getTvGenre = (language: string): Promise<Genres> => {
  const url = `https://api.themoviedb.org/3/genre/tv/list?language=${language}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};

// TRENDING

export const getTrending = (
  page: number,
  language: string
): Promise<SearchResult> => {
  const url = `https://api.themoviedb.org/3/trending/all/week?language=${language}&page=${page}`;
  return fetch(url, getRequestOptions).then((res) => res.json());
};
