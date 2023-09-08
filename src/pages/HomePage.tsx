import { Container, Fab, Grid } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "src/App";
import { getMovieGenre, getTvGenre } from "src/api/commun";
import { Genre } from "src/models/commun/Genre";
import { MediaType } from "src/models/enum";
import { useQuery } from "src/utils/hook";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ScrollTop } from "src/components/commun/ScrollTop";
import { Footer } from "src/components/footer/Footer";
import { Header } from "src/components/header/Header";

export const SearchContext = createContext<{
  type: MediaType | undefined;
  query: string;
  genres: Array<Genre>;
  setQuery: (query: string) => void;
  setType: (type: MediaType | undefined) => void;
}>({
  type: undefined,
  query: "",
  genres: [],
  setQuery: (query: string) => {},
  setType: (type: MediaType | undefined) => {},
});

export const HomePage = () => {
  const params = useQuery();
  const { language } = useContext(UserContext);

  const [query, setQuery] = useState(
    params.has("query") ? (params.get("query") as string) : ""
  );
  const [type, setType] = useState<MediaType | undefined>(
    params.has("type") ? (params.get("type") as MediaType) : undefined
  );
  const [genres, setGenres] = useState<Array<Genre>>([]);

  useEffect(() => {
    Promise.all([
      getTvGenre(language.iso_639_1),
      getMovieGenre(language.iso_639_1),
    ]).then((res) => {
      setGenres([
        ...res[0].genres.map((el) => ({ ...el, type: MediaType.tv })),
        ...res[1].genres.map((el) => ({ ...el, type: MediaType.movie })),
      ]);
    });
  }, [language]);

  return (
    <SearchContext.Provider value={{ type, setType, query, genres, setQuery }}>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="lg">
            <Header />
          </Container>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 8 }}>
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
