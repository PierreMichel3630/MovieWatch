import { Container, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { getMovieTrending } from "src/api/tmdb/movie";
import { getTvTrending } from "src/api/tmdb/tv";
import { CardSearch } from "src/components/commun/CardSearch";
import { useTranslation } from "react-i18next";
import { getBreakpoint } from "src/utils/mediaQuery";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";
import { MediaType } from "src/models/tmdb/enum";

const titleCss = style({
  cursor: "pointer",
});

export const TrendingPage = () => {
  const NUMBERLINESHOW = 2;
  const PAGE = 1;
  const navigate = useNavigate();
  const { language } = useContext(UserContext);
  const { t } = useTranslation();

  const [movies, setMovies] = useState<Array<MovieSearchElement>>([]);

  const [series, setSeries] = useState<Array<TvSearchElement>>([]);

  useEffect(() => {
    getMovieTrending(PAGE, language.language).then((res) => {
      setMovies(res.results as Array<MovieSearchElement>);
    });
    getTvTrending(PAGE, language.language).then((res) => {
      setSeries(res.results as Array<TvSearchElement>);
    });
  }, [language]);

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 6,
    sm: 3,
    md: 2,
    lg: 2,
    xl: 2,
  }[breakpoint];
  const itemPerLine = (12 / cols) * NUMBERLINESHOW;

  const moviesDisplay = movies.slice(0, itemPerLine);

  const seriesDisplay = series.slice(0, itemPerLine);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            variant="h2"
            className={titleCss}
            onClick={() =>
              navigate({
                pathname: `/trending`,
                search: `?page=1&type=${MediaType.movie}`,
              })
            }
          >
            {t("commun.trendingmovie")}
          </Typography>
        </Grid>
        {moviesDisplay.map((el) => (
          <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
            <CardSearch key={el.id} value={el} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography
            variant="h2"
            className={titleCss}
            onClick={() =>
              navigate({
                pathname: `/trending`,
                search: `?page=1&type=${MediaType.tv}`,
              })
            }
          >
            {t("commun.trendingserie")}
          </Typography>
        </Grid>
        {seriesDisplay.map((el) => (
          <Grid item xs={6} sm={4} md={3} lg={3} xl={2}>
            <CardSearch key={el.id} value={el} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
