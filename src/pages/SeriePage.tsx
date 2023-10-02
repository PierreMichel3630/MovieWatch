import { Container, Grid } from "@mui/material";
import { percent, viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import { getTvDetails, getTvImage, getTvReview, getTvVideo } from "src/api/tv";
import { PhotosBlock } from "src/components/PhotosBlock";
import { ReviewBlock } from "src/components/ReviewBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { CastsSerieBlock } from "src/components/serie/CastsSerieBlock";
import { EpisodesBlock } from "src/components/serie/EpisodesBlock";
import { HeaderSerie } from "src/components/serie/HeaderSerie";
import { Image } from "src/models/commun/Image";
import { Review } from "src/models/commun/Review";
import { Video } from "src/models/commun/Video";
import { ImageType } from "src/models/enum";
import { SerieDetails } from "src/models/tv/SerieDetails";
import { getBreakpoint } from "src/utils/mediaQuery";
import { style } from "typestyle";

export const SeriePage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | SerieDetails>(undefined);
  const [images, setImages] = useState<Array<Image>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);
  const [reviews, setReviews] = useState<Array<Review>>([]);

  const [isLoadingDetail, setIsLoadingDetail] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const breakpoint = getBreakpoint();
  const isSmallScreen = breakpoint === "xs" || breakpoint === "sm";

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
          detail
            ? `https://image.tmdb.org/t/p/original${
                isSmallScreen ? detail.poster_path : detail.backdrop_path
              }`
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
      getTvDetails(Number(id), language.iso_639_1).then((res) => {
        setDetail(res);
        setIsLoadingDetail(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingImage(true);
    if (id) {
      getTvImage(Number(id), language.iso_639_1).then((res) => {
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
      getTvVideo(Number(id), language.iso_639_1).then((res) => {
        setVideos(res.results);
        setIsLoadingVideo(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingReview(true);
    if (id) {
      Promise.all([
        getTvReview(Number(id), language.iso_639_1),
        getTvReview(Number(id), "us"),
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
  }, [id, language]);

  return (
    <Grid container>
      <Grid item xs={12} className={backdropCss}>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <HeaderSerie
            detail={detail}
            videos={videos}
            isLoading={isLoadingDetail}
          />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <CastsSerieBlock />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <PhotosBlock
            name={detail?.name}
            images={images}
            isLoading={isLoadingImage}
            hasFilter
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
          <EpisodesBlock />
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
