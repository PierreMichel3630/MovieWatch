import { Container, Grid, Typography } from "@mui/material";
import { percent } from "csx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getTvEpisodeImages,
  getTvEpisodeVideos,
  getTvSeason,
} from "src/api/tmdb/tv";
import { CastsBlock } from "src/components/CastsBlock";
import { PhotosBlock } from "src/components/PhotosBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { Backdrop } from "src/models/tmdb/commun/Backdrop";
import { Video } from "src/models/tmdb/commun/Video";
import { EpisodeDetail } from "src/models/tmdb/tv/EpisodeDetail";
import { SeasonDetail } from "src/models/tmdb/tv/SeasonDetail";
import { style } from "typestyle";

const posterCss = style({
  width: percent(100),
});

export const EpisodePage = () => {
  let { id, episode, season } = useParams();
  const { language } = useContext(UserContext);

  const [seasonDetail, setSeasonDetail] = useState<undefined | SeasonDetail>(
    undefined
  );
  const [episodeSelected, setEpisodeSelected] = useState<
    undefined | EpisodeDetail
  >(undefined);
  const [images, setImages] = useState<Array<Backdrop>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);

  useEffect(() => {
    if (id && episode && season) {
      getTvSeason(Number(id), Number(season), language.language).then((res) => {
        setSeasonDetail(res);
        setEpisodeSelected(
          res.episodes.find((el) => el.episode_number === Number(episode))
        );
      });
    }
  }, [id, season, language]);

  useEffect(() => {
    if (id && episode && season) {
      getTvEpisodeImages(
        Number(id),
        Number(season),
        Number(episode),
        language.language
      ).then((res) => {
        setImages(res.stills);
      });
    }
  }, [id, episode, season, language]);

  useEffect(() => {
    if (id && episode && season) {
      getTvEpisodeVideos(
        Number(id),
        Number(season),
        Number(episode),
        language.language
      ).then((res) => {
        setVideos(res.results);
      });
    }
  }, [id, episode, season, language]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {episodeSelected && (
          <>
            <Grid item xs={3}>
              <img
                src={`https://image.tmdb.org/t/p/original${episodeSelected.still_path}`}
                className={posterCss}
              />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="h4">
                S{episodeSelected.season_number}.E
                {episodeSelected.episode_number} -{episodeSelected.name}
              </Typography>
              <Typography variant="body1">
                {episodeSelected.overview}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CastsBlock casts={episodeSelected.guest_stars} />
            </Grid>
            <Grid item xs={12}>
              <CastsBlock casts={episodeSelected.crew} />
            </Grid>
            <Grid item xs={12}>
              <PhotosBlock images={images} />
            </Grid>
            <Grid item xs={12}>
              <VideosBlock videos={videos} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};
