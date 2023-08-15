import { Home } from "src/pages/Home";
import { DiscoverPage } from "src/pages/tmdb/DiscoverPage";
import { EpisodePage } from "src/pages/tmdb/EpisodePage";
import { MoviePage } from "src/pages/tmdb/MoviePage";
import { PersonPage } from "src/pages/tmdb/PersonPage";
import { SearchPage } from "src/pages/tmdb/SearchPage";
import { SeriePage } from "src/pages/tmdb/SeriePage";
import { TrendingPage } from "src/pages/tmdb/TrendingPage";
import { TrendingSearchPage } from "src/pages/tmdb/TrendingSearchPage";

export const MovieRoutes = [
  {
    path: "/",
    element: <Home />,
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
        path: "/serie/:id",
        element: <SeriePage />,
      },
      {
        path: "/serie/:id/season/:season/episode/:episode",
        element: <EpisodePage />,
      },
      {
        path: "/trending",
        element: <TrendingSearchPage />,
      },
      {
        path: "/discover",
        element: <DiscoverPage />,
      },
    ],
  },
];
