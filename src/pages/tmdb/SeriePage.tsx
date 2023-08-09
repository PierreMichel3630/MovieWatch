import { Container, Grid } from "@mui/material";
import { percent, viewHeight } from "csx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getTvCredit,
  getTvDetails,
  getTvImage,
  getTvVideo,
} from "src/api/tmdb/tv";
import { CastsBlock } from "src/components/CastsBlock";
import { PhotosBlock } from "src/components/PhotosBlock";
import { VideosBlock } from "src/components/VideosBlock";
import { EpisodesBlock } from "src/components/serie/EpisodesBlock";
import { HeaderSerie } from "src/components/serie/HeaderSerie";
import { Cast } from "src/models/tmdb/commun/Cast";
import { Image } from "src/models/tmdb/commun/Image";
import { Video } from "src/models/tmdb/commun/Video";
import { ImageType } from "src/models/tmdb/enum";
import { SerieDetails } from "src/models/tmdb/tv/SerieDetails";
import { style } from "typestyle";

export const SeriePage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | SerieDetails>(undefined);
  const [casts, setCasts] = useState<Array<Cast>>([]);
  const [images, setImages] = useState<Array<Image>>([]);
  const [videos, setVideos] = useState<Array<Video>>([]);

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
            ? `https://image.tmdb.org/t/p/original${detail.backdrop_path}`
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
      getTvDetails(Number(id), language.language).then((res) => {
        setDetail(res);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getTvCredit(Number(id), language.language).then((res) => {
        setCasts(res.cast);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getTvImage(Number(id), language.language).then((res) => {
        setImages([
          ...res.backdrops.map((el) => ({ ...el, type: ImageType.backdrop })),
          ...res.logos.map((el) => ({ ...el, type: ImageType.logo })),
          ...res.posters.map((el) => ({ ...el, type: ImageType.poster })),
        ]);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getTvVideo(Number(id), language.language).then((res) => {
        setVideos(res.results);
      });
    }
  }, [id, language]);

  return (
    <Grid container>
      <Grid item xs={12} className={backdropCss}>
        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <HeaderSerie detail={detail} videos={videos} />
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
      <Grid item xs={12}>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <EpisodesBlock />
        </Container>
      </Grid>
    </Grid>
  );
};
