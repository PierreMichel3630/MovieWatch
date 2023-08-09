import { Chip, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { getBreakpoint } from "src/utils/mediaQuery";
import { SeeMoreButton } from "./button/Button";
import { style } from "typestyle";
import { Video } from "src/models/tmdb/commun/Video";

const divFilterCss = style({ marginLeft: 15, display: "flex", gap: 10 });

enum Filter {
  all = "all",
  trailer = "trailer",
}

interface Props {
  videos: Array<Video>;
}

export const VideosBlock = ({ videos }: Props) => {
  const NUMBERLINESHOW = 1;
  const FILTERFALSE = {
    all: false,
    trailer: false,
  };

  const { t } = useTranslation();

  const [seeMore, setSeeMore] = useState(false);
  const [filter, setFilter] = useState({
    all: true,
    trailer: false,
  });

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
  }[breakpoint];

  const filterVideos = (a: Video) => {
    let res = false;
    if (filter[Filter.all]) {
      res = true;
    } else if (filter[Filter.trailer]) {
      res = a.type === "Trailer";
    }
    return res;
  };

  const selectFilter = (value: Filter) => {
    setFilter({ ...FILTERFALSE, [value]: !filter[value] });
  };

  const videosFilter = videos.filter(filterVideos);

  const videosDisplay = seeMore
    ? videosFilter
    : videosFilter.slice(0, (12 / cols) * NUMBERLINESHOW);

  return (
    videos.length > 0 && (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{t("commun.videos")}</Typography>
          <div className={divFilterCss}>
            <Chip
              label={t("commun.all")}
              variant={filter.all ? "filled" : "outlined"}
              onClick={() => selectFilter(Filter.all)}
            />
            <Chip
              label={t("commun.trailer")}
              variant={filter.trailer ? "filled" : "outlined"}
              onClick={() => selectFilter(Filter.trailer)}
            />
          </div>
        </Grid>
        {videosDisplay.map((video) => (
          <Grid item xs={12} sm={6}>
            <iframe
              width="100%"
              height="480"
              src={`https://www.youtube.com/embed/${video.key}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </Grid>
        ))}
        {videosFilter.length > cols * NUMBERLINESHOW && (
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
