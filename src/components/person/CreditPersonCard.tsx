import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { percent } from "csx";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { PersonCrew } from "src/models/tmdb/person/PersonCrew";
import { PersonCastMovie } from "src/models/tmdb/person/PersonCastMovie";
import { PersonCastTv } from "src/models/tmdb/person/PersonCastTv";
import { MediaType } from "src/models/tmdb/enum";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface PropsCast {
  value: PersonCastTv | PersonCastMovie;
  type: MediaType;
}

export const CastPersonCard = ({ value, type }: PropsCast) => {
  return type === MediaType.movie ? (
    <CastPersonMovieCard value={value as PersonCastMovie} />
  ) : (
    <CastPersonTvCard value={value as PersonCastTv} />
  );
};

interface PropsCastTv {
  value: PersonCastTv;
}
export const CastPersonTvCard = ({ value }: PropsCastTv) => {
  const { t } = useTranslation();
  return (
    <Link to={`/serie/${value.id}`}>
      <Card className={cardCss}>
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
          <Typography variant="body1">{value.character}</Typography>
          <Typography variant="h6">
            {value.first_air_date !== ""
              ? moment(value.first_air_date).format("YYYY")
              : t("commun.datenotknow")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

interface PropsCastMovie {
  value: PersonCastMovie;
}

export const CastPersonMovieCard = ({ value }: PropsCastMovie) => {
  const { t } = useTranslation();
  return (
    <Link to={`/movie/${value.id}`}>
      <Card className={cardCss}>
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
          <Typography variant="h4" component="a">
            {value.title}
          </Typography>
          <Typography variant="body1">{value.character}</Typography>
          <Typography variant="h6">
            {value.release_date !== ""
              ? moment(value.release_date).format("YYYY")
              : t("commun.datenotknow")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

interface PropsCrew {
  value: PersonCrew;
}

export const CrewPersonCard = ({ value }: PropsCrew) => (
  <Link to={`/movie/${value.id}`}>
    <Card className={cardCss}>
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
        <Typography variant="h4">{value.job}</Typography>
        <Typography>{moment(value.release_date).format("YYYY")}</Typography>
      </CardContent>
    </Card>
  </Link>
);
