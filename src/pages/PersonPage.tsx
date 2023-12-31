import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { UserContext } from "src/App";
import { getPersonDetails, getPersonImage } from "src/api/person";
import { PhotosBlock } from "src/components/PhotosBlock";
import { HeaderPerson } from "src/components/person/HeaderPerson";
import { PersonCreditsBlock } from "src/components/person/PersonCreditsBlock";
import { Image } from "src/models/commun/Image";
import { ImageType } from "src/models/enum";
import { PersonDetails } from "src/models/person/PersonDetails";

export const PersonPage = () => {
  let { id } = useParams();
  const { language } = useContext(UserContext);

  const [detail, setDetail] = useState<undefined | PersonDetails>(undefined);
  const [images, setImages] = useState<Array<Image>>([]);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      getPersonDetails(Number(id), language.iso_639_1).then((res) => {
        setDetail(res);
        setIsLoading(false);
      });
    }
  }, [id, language]);

  useEffect(() => {
    setIsLoadingImage(true);
    if (id) {
      getPersonImage(Number(id)).then((res) => {
        setImages([
          ...res.profiles.map((el) => ({ ...el, type: ImageType.profile })),
        ]);
        setIsLoadingImage(false);
      });
    }
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>
          {detail ? `${detail.name} - MovieSerieSearch` : "MovieSerieSearch"}
        </title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderPerson detail={detail} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12}>
          <PersonCreditsBlock />
        </Grid>
        <Grid item xs={12}>
          <PhotosBlock
            name={detail?.name}
            images={images}
            isLoading={isLoadingImage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
