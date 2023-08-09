import { Grid, Typography } from "@mui/material";
import { CastPersonCard } from "./CreditPersonCard";
import { useTranslation } from "react-i18next";
import { getBreakpoint } from "src/utils/mediaQuery";
import { useState } from "react";
import { SeeMoreButton } from "../button/Button";
import { sortByReleaseYear } from "src/utils/sort";
import { PersonCredits } from "src/models/tmdb/person/PersonCredits";

interface Props {
  movies?: PersonCredits;
  series?: PersonCredits;
}

export const PersonCreditsBlock = ({ movies, series }: Props) => {
  const NUMBERLINESHOW = 2;
  const { t } = useTranslation();

  const [seeMoreMovie, setSeeMoreMovie] = useState(false);
  const [seeMoreSerie, setSeeMoreSerie] = useState(false);

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 6,
    sm: 3,
    md: 3,
    lg: 2,
    xl: 2,
  }[breakpoint];

  const moviesFilter = movies ? movies.cast : [];
  const moviesDisplay = seeMoreMovie
    ? moviesFilter.sort(sortByReleaseYear)
    : moviesFilter
        .sort(sortByReleaseYear)
        .slice(0, (12 / cols) * NUMBERLINESHOW);

  const seriesFilter = series ? series.cast : [];
  const seriesDisplay = seeMoreSerie
    ? seriesFilter.sort(sortByReleaseYear)
    : seriesFilter
        .sort(sortByReleaseYear)
        .slice(0, (12 / cols) * NUMBERLINESHOW);

  return (
    <Grid container spacing={1}>
      {moviesDisplay.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant="h2">{t("commun.movies")}</Typography>
          </Grid>
          {moviesDisplay.map((cast) => (
            <Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
              <CastPersonCard value={cast} url="movie" />
            </Grid>
          ))}
          {moviesFilter.length > cols * NUMBERLINESHOW && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SeeMoreButton
                seeMore={seeMoreMovie}
                onClick={() => setSeeMoreMovie(!seeMoreMovie)}
              />
            </Grid>
          )}
        </>
      )}
      {seriesDisplay.length > 0 && (
        <>
          <Grid item xs={12}>
            <Typography variant="h2">{t("commun.series")}</Typography>
          </Grid>
          {seriesDisplay.map((cast) => (
            <Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
              <CastPersonCard value={cast} url="serie" />
            </Grid>
          ))}
          {seriesFilter.length > cols * NUMBERLINESHOW && (
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <SeeMoreButton
                seeMore={seeMoreSerie}
                onClick={() => setSeeMoreSerie(!seeMoreSerie)}
              />
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
