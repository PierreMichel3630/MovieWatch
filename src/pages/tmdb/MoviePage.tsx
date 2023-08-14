import { Container, Grid } from "@mui/material";
import { percent, viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getMovieDetails,
  getMovieImage,
  getMovieVideo,
} from "src/api/tmdb/movie";
import { PhotosBlock } from "src/components/PhotosBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { CastsBlockMovie } from "src/components/movie/CastsBlockMovie";
import { HeaderMovie } from "src/components/movie/HeaderMovie";
import { Backdrop } from "src/models/tmdb/commun/Backdrop";
import { Image } from "src/models/tmdb/commun/Image";
import { Video } from "src/models/tmdb/commun/Video";
import { ImageType } from "src/models/tmdb/enum";
import { MovieDetails } from "src/models/tmdb/movie/MovieDetails";
import { style } from "typestyle";

export const MoviePage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | MovieDetails>(undefined);
  const [images, setImages] = useState<Array<Image>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);
  const [backdrop, setBackdrop] = useState<undefined | Backdrop>(undefined);

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);

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
    setIsLoadingDetail(true);
    if (id) {
      getMovieDetails(Number(id), language.language).then((res) => {
        setDetail(res);
        setIsLoadingDetail(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingImage(true);
    if (id) {
      getMovieImage(Number(id), language.language).then((res) => {
        setImages([
          ...res.backdrops.map((el) => ({ ...el, type: ImageType.backdrop })),
          ...res.logos.map((el) => ({ ...el, type: ImageType.logo })),
          ...res.posters.map((el) => ({ ...el, type: ImageType.poster })),
        ]);
        setBackdrop(res.backdrops.length > 0 ? res.backdrops[0] : undefined);
        setIsLoadingImage(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingVideo(true);
    if (id) {
      getMovieVideo(Number(id), language.language).then((res) => {
        setVideos(res.results);
        setIsLoadingVideo(false);
      });
    }
  }, [id, language]);

  return (
    <Grid container>
      <Grid item xs={12} className={backdropCss}>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <HeaderMovie
            detail={detail}
            videos={videos}
            isLoading={isLoadingDetail}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <CastsBlockMovie />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <PhotosBlock
            name={detail?.title}
            images={images}
            hasFilter
            isLoading={isLoadingImage}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <VideosBlock videos={videos} isLoading={isLoadingVideo} />
        </Container>
      </Grid>
    </Grid>
  );
};
