import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { percent } from "csx";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { PersonCast } from "src/models/tmdb/person/PersonCast";
import { PersonCrew } from "src/models/tmdb/person/PersonCrew";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface PropsCast {
  value: PersonCast;
  url: string;
}

export const CastPersonCard = ({ value, url }: PropsCast) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Card onClick={() => navigate(`/${url}/${value.id}`)} className={cardCss}>
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
        <Typography variant="body1">{value.character}</Typography>
        <Typography variant="h6">
          {value.release_date !== ""
            ? moment(value.release_date).format("YYYY")
            : t("commun.datenotknow")}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface PropsCrew {
  value: PersonCrew;
}

export const CrewPersonCard = ({ value }: PropsCrew) => {
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
        <Typography variant="h4">{value.job}</Typography>
        <Typography>{moment(value.release_date).format("YYYY")}</Typography>
      </CardContent>
    </Card>
  );
};
