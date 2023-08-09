import { Container, Grid } from "@mui/material";
import { percent, viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getMovieCredit,
  getMovieDetails,
  getMovieImage,
  getMovieVideo,
} from "src/api/tmdb/movie";
import { CastsBlock } from "src/components/CastsBlock";
import { PhotosBlock } from "src/components/PhotosBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { HeaderMovie } from "src/components/movie/HeaderMovie";
import { Backdrop } from "src/models/tmdb/commun/Backdrop";
import { Cast } from "src/models/tmdb/commun/Cast";
import { Image } from "src/models/tmdb/commun/Image";
import { Video } from "src/models/tmdb/commun/Video";
import { ImageType } from "src/models/tmdb/enum";
import { MovieDetails } from "src/models/tmdb/movie/MovieDetails";
import { style } from "typestyle";

export const MoviePage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | MovieDetails>(undefined);
  const [casts, setCasts] = useState<Array<Cast>>([]);
  const [images, setImages] = useState<Array<Image>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);

  const [backdrop, setBackdrop] = useState<undefined | Backdrop>(undefined);
  const [poster, setPoster] = useState<undefined | Backdrop>(undefined);

  const backdropCss = style({
    width: percent(100),
    height: viewHeight(75),
    position: "relative",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    $nest: {
      "&::before": {
        content: "''",
        backgroundImage: `url('${
          backdrop
            ? `https://image.tmdb.org/t/p/original${backdrop.file_path}`
            : ""
        }')`,
        backgroundSize: "cover",
        position: "absolute",
        width: percent(100),
        height: percent(100),
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        opacity: 0.25,
      },
    },
  });

  useEffect(() => {
    if (id) {
      getMovieDetails(Number(id), language.language).then((res) => {
        setDetail(res);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getMovieCredit(Number(id), language.language).then((res) => {
        setCasts(res.cast);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getMovieImage(Number(id), language.language).then((res) => {
        setImages([
          ...res.backdrops.map((el) => ({ ...el, type: ImageType.backdrop })),
          ...res.logos.map((el) => ({ ...el, type: ImageType.logo })),
          ...res.posters.map((el) => ({ ...el, type: ImageType.poster })),
        ]);
        setBackdrop(res.backdrops.length > 0 ? res.backdrops[0] : undefined);
        setPoster(res.posters.length > 0 ? res.posters[0] : undefined);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getMovieVideo(Number(id), language.language).then((res) => {
        setVideos(res.results);
      });
    }
  }, [id, language]);

  return (
    <Grid container>
      <Grid item xs={12} className={backdropCss}>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <HeaderMovie poster={poster} detail={detail} videos={videos} />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <CastsBlock casts={casts} />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <PhotosBlock images={images} hasFilter />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <VideosBlock videos={videos} />
        </Container>
      </Grid>
    </Grid>
  );
};
