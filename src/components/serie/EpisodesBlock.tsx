import { Chip, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import { getTvDetails, getTvSeason } from "src/api/tmdb/tv";
import { range } from "src/utils/array";
import { CardEpisode } from "../commun/Card";
import { SerieDetails } from "src/models/tmdb/tv/SerieDetails";
import { SeasonDetail } from "src/models/tmdb/tv/SeasonDetail";

export const EpisodesBlock = () => {
  let { id } = useParams();
  const { t } = useTranslation();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | SerieDetails>(undefined);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  const [seasonDetail, setSeasonDetail] = useState<undefined | SeasonDetail>(
    undefined
  );

  useEffect(() => {
    if (id) {
      getTvDetails(Number(id), language.language).then((res) => {
        setDetail(res);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getTvSeason(Number(id), selectedSeason, language.language).then((res) => {
        setSeasonDetail(res);
      });
    }
  }, [selectedSeason, language]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.episodes")}</Typography>
      </Grid>
      {detail && (
        <>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {range(1, detail.number_of_seasons).map((el) => (
                <Grid item>
                  <Chip
                    label={`${t("commun.season")}${" "}${el}`}
                    variant={selectedSeason === el ? "filled" : "outlined"}
                    onClick={() => setSelectedSeason(el)}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {seasonDetail && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {seasonDetail.episodes.map((episode) => (
                  <Grid item key={episode.id} xs={12}>
                    <CardEpisode value={episode} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
