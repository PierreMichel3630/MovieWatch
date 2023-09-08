import { DiscoverPage } from "src/pages/DiscoverPage";
import { EpisodePage } from "src/pages/EpisodePage";
import { HomePage } from "src/pages/HomePage";
import { MoviePage } from "src/pages/MoviePage";
import { PersonPage } from "src/pages/PersonPage";
import { SearchPage } from "src/pages/SearchPage";
import { SeriePage } from "src/pages/SeriePage";
import { TrendingPage } from "src/pages/TrendingPage";
import { TrendingSearchPage } from "src/pages/TrendingSearchPage";

export const MovieRoutes = [
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/",
        element: <TrendingPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
      {
        path: "/person/:id",
        element: <PersonPage />,
      },
      {
        path: "/tv/:id",
        element: <SeriePage />,
      },
      {
        path: "/tv/:id/season/:season/episode/:episode",
        element: <EpisodePage />,
      },
      {
        path: "/trendingsearch",
        element: <TrendingSearchPage />,
      },
      {
        path: "/discover",
        element: <DiscoverPage />,
      },
    ],
  },
];
