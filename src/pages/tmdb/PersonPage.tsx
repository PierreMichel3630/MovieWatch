import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import {
  getPersonDetails,
  getPersonImage,
  getPersonMovieCredit,
  getPersonTVCredit,
} from "src/api/tmdb/person";
import { PhotosBlock } from "src/components/PhotosBlock";
import { HeaderPerson } from "src/components/person/HeaderPerson";
import { PersonCreditsBlock } from "src/components/person/PersonCreditsBlock";
import { Image } from "src/models/tmdb/commun/Image";
import { ImageType } from "src/models/tmdb/enum";
import { PersonCredits } from "src/models/tmdb/person/PersonCredits";
import { PersonDetails } from "src/models/tmdb/person/PersonDetails";

export const PersonPage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | PersonDetails>(undefined);
  const [movies, setMovies] = useState<undefined | PersonCredits>(undefined);
  const [series, setSeries] = useState<undefined | PersonCredits>(undefined);
  const [images, setImages] = useState<Array<Image>>([]);

  useEffect(() => {
    if (id) {
      getPersonDetails(Number(id), language.language).then((res) => {
        setDetail(res);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getPersonTVCredit(Number(id), language.language).then((res) => {
        setSeries(res);
      });
      getPersonMovieCredit(Number(id), language.language).then((res) => {
        setMovies(res);
      });
    }
  }, [id, language]);

  useEffect(() => {
    if (id) {
      getPersonImage(Number(id)).then((res) => {
        setImages([
          ...res.profiles.map((el) => ({ ...el, type: ImageType.profile })),
        ]);
      });
    }
  }, [id]);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderPerson detail={detail} />
        </Grid>
        <Grid item xs={12}>
          <PersonCreditsBlock movies={movies} series={series} />
        </Grid>
        <Grid item xs={12}>
          <PhotosBlock images={images} />
        </Grid>
      </Grid>
    </Container>
  );
};
