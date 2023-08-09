import { Chip, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sortByPopularity } from "src/utils/sort";
import { CardPerson } from "./commun/Card";
import { useState } from "react";
import { getBreakpoint } from "src/utils/mediaQuery";
import { SeeMoreButton } from "./button/Button";
import { style } from "typestyle";
import { Cast } from "src/models/tmdb/commun/Cast";

const divFilterCss = style({ marginLeft: 15, display: "flex", gap: 10 });

interface Props {
  casts: Array<Cast>;
}

enum Filter {
  all = "all",
  acting = "acting",
  techniqueTeam = "techniqueTeam",
}

export const CastsBlock = ({ casts }: Props) => {
  const NUMBERLINESHOW = 1;
  const FILTERFALSE = {
    all: false,
    acting: false,
    techniqueTeam: false,
  };

  const { t } = useTranslation();

  const [seeMore, setSeeMore] = useState(false);
  const [filter, setFilter] = useState({
    all: true,
    acting: false,
    techniqueTeam: false,
  });

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 6,
    sm: 3,
    md: 3,
    lg: 2,
    xl: 2,
  }[breakpoint];
  const itemPerLine = (12 / cols) * NUMBERLINESHOW;

  const filterCasts = (a: Cast) => {
    let res = false;
    if (filter[Filter.all]) {
      res = true;
    } else if (filter[Filter.techniqueTeam]) {
      res = a.known_for_department !== "Acting";
    } else if (filter[Filter.acting]) {
      res = a.known_for_department === "Acting";
    }
    return res;
  };

  const selectFilter = (value: Filter) => {
    setFilter({ ...FILTERFALSE, [value]: !filter[value] });
  };

  const castsFilter = casts.filter(filterCasts);

  const castsDisplay = seeMore
    ? castsFilter.sort(sortByPopularity)
    : castsFilter.sort(sortByPopularity).slice(0, itemPerLine);

  return (
    casts.length > 0 && (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{t("commun.cast")}</Typography>
          <div className={divFilterCss}>
            <Chip
              label={t("commun.all")}
              variant={filter.all ? "filled" : "outlined"}
              onClick={() => selectFilter(Filter.all)}
            />
            <Chip
              label={t("tmdb.department.acting")}
              variant={filter.acting ? "filled" : "outlined"}
              onClick={() => selectFilter(Filter.acting)}
            />
            <Chip
              label={t("tmdb.department.technical")}
              variant={filter.techniqueTeam ? "filled" : "outlined"}
              onClick={() => selectFilter(Filter.techniqueTeam)}
            />
          </div>
        </Grid>
        {castsDisplay.map((cast) => (
          <Grid item key={cast.id} xs={6} sm={3} md={3} lg={2} xl={2}>
            <CardPerson value={cast} />
          </Grid>
        ))}
        {castsFilter.length > itemPerLine && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SeeMoreButton
              seeMore={seeMore}
              onClick={() => setSeeMore(!seeMore)}
            />
          </Grid>
        )}
      </Grid>
    )
  );
};
