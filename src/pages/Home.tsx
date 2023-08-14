import { Container, Fab, Grid } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "src/App";
import { getMovieGenre, getTvGenre } from "src/api/tmdb/commun";
import { ScrollTop } from "src/components/commun/ScrollTop";
import { Header } from "src/components/header/Header";
import { Genre } from "src/models/tmdb/commun/Genre";
import { MediaType } from "src/models/tmdb/enum";
import { useQuery } from "src/utils/hook";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Footer } from "src/components/footer/Footer";

export const SearchContext = createContext<{
  query: string;
  genres: Array<Genre>;
  setQuery: (query: string) => void;
}>({
  query: "",
  genres: [],
  setQuery: (query: string) => {},
});

export const Home = () => {
  const params = useQuery();
  const { language } = useContext(UserContext);
  const [query, setQuery] = useState(
    params.has("query") ? (params.get("query") as string) : ""
  );
  const [genres, setGenres] = useState<Array<Genre>>([]);

  useEffect(() => {
    Promise.all([
      getTvGenre(language.language),
      getMovieGenre(language.language),
    ]).then((res) => {
      setGenres([
        ...res[0].genres.map((el) => ({ ...el, type: MediaType.tv })),
        ...res[1].genres.map((el) => ({ ...el, type: MediaType.movie })),
      ]);
    });
  }, [language]);

  return (
    <SearchContext.Provider value={{ query, genres, setQuery }}>
      <Grid container sx={{ marginBottom: 8 }}>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Header />
          </Container>
        </Grid>
        <Grid item xs={12}>
          <Outlet />
        </Grid>
        <ScrollTop>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Footer />
      </Grid>
    </SearchContext.Provider>
  );
};
