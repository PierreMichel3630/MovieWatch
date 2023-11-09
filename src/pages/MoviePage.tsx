import { Container, Grid } from "@mui/material";
import { percent, viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getMovieDetails,
  getMovieImage,
  getMovieReview,
  getMovieVideo,
} from "src/api/movie";
import { PhotosBlock } from "src/components/PhotosBlock";
import { ReviewBlock } from "src/components/ReviewBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { CastsBlockMovie } from "src/components/movie/CastsBlockMovie";
import { HeaderMovie } from "src/components/movie/HeaderMovie";
import { Image } from "src/models/commun/Image";
import { Review } from "src/models/commun/Review";
import { Video } from "src/models/commun/Video";
import { ImageType } from "src/models/enum";
import { MovieDetails } from "src/models/movie/MovieDetails";
import { getBreakpoint } from "src/utils/mediaQuery";
import { style } from "typestyle";

export const MoviePage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | MovieDetails>(undefined);
  const [images, setImages] = useState<Array<Image>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);
  const [reviews, setReviews] = useState<Array<Review>>([]);

  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const breakpoint = getBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "sm";

  const backdropCss = style({
    width: percent(100),
    minHeight: viewHeight(75),
    position: "relative",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    $nest: {
      "&::before": {
        content: "''",
        backgroundImage: `url('${
          detail
            ? `https://image.tmdb.org/t/p/original${
                isSmallScreen ? detail.poster_path : detail.backdrop_path
              }`
            : ""
        }')`,
        backgroundSize: "cover",
        position: "absolute",
        width: percent(100),
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
      getMovieDetails(Number(id), language.iso_639_1).then((res) => {
        setDetail(res);
        setIsLoadingDetail(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingImage(true);
    if (id) {
      getMovieImage(Number(id), language.iso_639_1).then((res) => {
        setImages([
          ...res.backdrops.map((el) => ({ ...el, type: ImageType.backdrop })),
          ...res.logos.map((el) => ({ ...el, type: ImageType.logo })),
          ...res.posters.map((el) => ({ ...el, type: ImageType.poster })),
        ]);
        setIsLoadingImage(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingVideo(true);
    if (id) {
      getMovieVideo(Number(id), language.iso_639_1).then((res) => {
        setVideos(res.results);
        setIsLoadingVideo(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingReview(true);
    if (id) {
      if (language.iso_639_1 === "en") {
        getMovieReview(Number(id), language.iso_639_1).then((res) => {
          setReviews([
            ...res.results.map((el) => ({
              ...el,
              language: language.iso_639_1,
            })),
          ]);
          setIsLoadingReview(false);
        });
      } else {
        Promise.all([
          getMovieReview(Number(id), language.iso_639_1),
          getMovieReview(Number(id), "en"),
        ]).then((res) => {
          setReviews([
            ...res[0].results.map((el) => ({
              ...el,
              language: language.iso_639_1,
            })),
            ...res[1].results.map((el) => ({
              ...el,
              language: "en",
            })),
          ]);
          setIsLoadingReview(false);
        });
      }
    }
  }, [id, language]);

  return (
    <Grid container>
      <Helmet>
        <title>
          {detail ? `${detail.title} - MovieSerieSearch` : "MovieSerieSearch"}
        </title>
      </Helmet>
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
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <ReviewBlock reviews={reviews} isLoading={isLoadingReview} />
        </Container>
      </Grid>
    </Grid>
  );
};
