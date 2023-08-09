import { MovieSearchElement } from "../movie/MovieSearchElement";
import { PersonSearchElement } from "../person/PersonSearchElement";
import { TvSearchElement } from "../tv/TvSearchElement";

export interface SearchResult {
  page: number;
  results: Array<MovieSearchElement | PersonSearchElement | TvSearchElement>;
  total_pages: number;
  total_results: number;
}
