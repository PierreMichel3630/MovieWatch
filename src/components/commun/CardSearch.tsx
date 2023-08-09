import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getListGenre } from "./Genre";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";
import { percent } from "csx";
import { ImageNotFoundBlock } from "./ImageBlock";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { PersonSearchElement } from "src/models/tmdb/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";
import { MediaType } from "src/models/tmdb/enum";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface PropsSearch {
  value: MovieSearchElement | PersonSearchElement | TvSearchElement;
}
export const CardSearch = ({ value }: PropsSearch) => {
  const getCardType = (
    value: MovieSearchElement | PersonSearchElement | TvSearchElement
  ) => {
    switch (value.media_type) {
      case MediaType.tv:
        return <CardTvSearch value={value as TvSearchElement} />;
      case MediaType.movie:
        return <CardMovieSearch value={value as MovieSearchElement} />;
      case MediaType.person:
        return <CardPersonSearch value={value as PersonSearchElement} />;
      default:
        return <CardTvSearch value={value as TvSearchElement} />;
    }
  };

  return getCardType(value);
};

interface PropsMovieSearch {
  value: MovieSearchElement;
}

export const CardMovieSearch = ({ value }: PropsMovieSearch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/movie/${value.id}`)} className={cardCss}>
      {value.poster_path !== null ? (
        <CardMedia
          sx={{ aspectRatio: "2/3" }}
          image={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
          title={value.title}
        />
      ) : (
        <ImageNotFoundBlock style={{ aspectRatio: "2/3" }} />
      )}
      <CardContent>
        <Typography variant="h4">{value.title}</Typography>
        <Typography>{moment(value.release_date).format("YYYY")}</Typography>
        <Typography>{getListGenre(value.genre_ids)}</Typography>
        <Typography variant="h6">{t("card.summary")}</Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
          }}
        >
          {value.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface PropsTvSearch {
  value: TvSearchElement;
}

export const CardTvSearch = ({ value }: PropsTvSearch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/serie/${value.id}`)} className={cardCss}>
      {value.poster_path !== null ? (
        <CardMedia
          sx={{ aspectRatio: "2/3" }}
          image={`https://image.tmdb.org/t/p/w500${value.poster_path}`}
          title={value.name}
        />
      ) : (
        <ImageNotFoundBlock style={{ aspectRatio: "2/3" }} />
      )}
      <CardContent>
        <Typography variant="h4">{value.name}</Typography>
        <Typography variant="body1">
          {moment(value.first_air_date).format("YYYY")}
        </Typography>
        <Typography variant="body1">{getListGenre(value.genre_ids)}</Typography>
        <Typography variant="h6">{t("card.summary")}</Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
          }}
        >
          {value.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface PropsPersonSearch {
  value: PersonSearchElement;
}

export const CardPersonSearch = ({ value }: PropsPersonSearch) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/person/${value.id}`)} className={cardCss}>
      {value.profile_path !== null ? (
        <CardMedia
          sx={{ aspectRatio: "2/3" }}
          image={`https://image.tmdb.org/t/p/w500${value.profile_path}`}
          title={value.name}
        />
      ) : (
        <ImageNotFoundBlock style={{ aspectRatio: "2/3" }} />
      )}
      <CardContent>
        <Typography variant="h4">{value.name}</Typography>
        <Typography variant="body1">{value.known_for_department}</Typography>
        <Typography variant="h6">{t("card.knowfor")}</Typography>
        <Typography
          variant="caption"
          color="secondary"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
          }}
        >
          {value.known_for.map((el) => el.title).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};
