import { Chip, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import { getTvDetails, getTvSeason } from "src/api/tmdb/tv";
import { CardEpisode } from "../commun/Card";
import { SerieDetails } from "src/models/tmdb/tv/SerieDetails";
import { SeasonDetail } from "src/models/tmdb/tv/SeasonDetail";
import { sortByEpisodeNumber } from "src/utils/sort";
import { CardEpisodeSkeleton, ChipSkeleton } from "../commun/skeleton/Skeleton";
import { style } from "typestyle";

const divSeasonCss = style({
  marginLeft: 15,
  display: "flex",
  gap: 10,
});

export const EpisodesBlock = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | SerieDetails>(undefined);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [seasonDetail, setSeasonDetail] = useState<undefined | SeasonDetail>(
    undefined
  );
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingSeason, setIsLoadingSeason] = useState(true);

  useEffect(() => {
    setIsLoadingDetail(true);
    if (id) {
      getTvDetails(Number(id), language.language).then((res) => {
        setDetail(res);
        setIsLoadingDetail(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingSeason(true);
    if (id) {
      getTvSeason(Number(id), selectedSeason, language.language).then((res) => {
        setSeasonDetail(res);
        setIsLoadingSeason(false);
      });
    }
  }, [selectedSeason, language]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h2">{t("commun.episodes")}</Typography>
        <div className={divSeasonCss}>
          {isLoadingDetail || detail === undefined
            ? Array.from(new Array(4)).map((el) => <ChipSkeleton />)
            : detail.seasons.map((season) => (
                <Chip
                  label={season.name}
                  variant={
                    selectedSeason === season.season_number
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() => setSelectedSeason(season.season_number)}
                />
              ))}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {isLoadingSeason || seasonDetail === undefined
            ? Array.from(new Array(5)).map((el) => (
                <Grid key={el} item xs={12}>
                  <CardEpisodeSkeleton />
                </Grid>
              ))
            : seasonDetail.episodes.sort(sortByEpisodeNumber).map((episode) => (
                <Grid item key={episode.id} xs={12}>
                  <CardEpisode value={episode} />
                </Grid>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
