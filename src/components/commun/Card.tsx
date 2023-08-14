import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { Link } from "react-router-dom";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "./ImageBlock";
import { Cast } from "src/models/tmdb/commun/Cast";
import { EpisodeDetail } from "src/models/tmdb/tv/EpisodeDetail";
import { TvAggregateCreditCast } from "src/models/tmdb/tv/TvAggregateCreditCast";
import { useTranslation } from "react-i18next";
import { GuestStar } from "src/models/tmdb/commun/GuestStar";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface PropsPerson {
  value: Cast;
}

export const CardPerson = ({ value }: PropsPerson) => (
  <Link to={`/person/${value.id}`}>
    <Card className={cardCss}>
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
        <Typography variant="caption">{value.character}</Typography>
        <Typography variant="h6">{value.known_for_department}</Typography>
      </CardContent>
    </Card>
  </Link>
);

interface PropsPersonTv {
  value: TvAggregateCreditCast;
}

export const CardPersonTv = ({ value }: PropsPersonTv) => {
  const { t } = useTranslation();
  return (
    <Link to={`/person/${value.id}`}>
      <Card className={cardCss}>
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
          {value.roles.map((role) => (
            <Typography variant="caption" component="p">{`${role.character} (${
              role.episode_count
            } ${t("commun.episodes")})`}</Typography>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};

interface PropsPersonGuest {
  value: GuestStar;
}

export const CardPersonGuest = ({ value }: PropsPersonGuest) => (
  <Link to={`/person/${value.id}`}>
    <Card className={cardCss}>
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
        <Typography variant="caption">{value.character}</Typography>
      </CardContent>
    </Card>
  </Link>
);

interface PropsEpisode {
  value: EpisodeDetail;
}

export const CardEpisode = ({ value }: PropsEpisode) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`/serie/${value.show_id}/season/${value.season_number}/episode/${value.episode_number}`}
    >
      <Card className={cardCss}>
        <Grid container>
          <Grid item xs={4}>
            {value.still_path !== null ? (
              <CardMedia
                sx={{
                  width: percent(100),
                  aspectRatio: "auto",
                  height: percent(100),
                  minHeight: px(250),
                }}
                image={`https://image.tmdb.org/t/p/original${value.still_path}`}
                title={value.name}
              />
            ) : (
              <ImageNotFoundBlock style={{ height: px(250) }} />
            )}
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography variant="h4">
                {`${t("commun.season")} ${value.season_number} ${t(
                  "commun.episode"
                )} ${value.episode_number} - ${value.name}`}
              </Typography>
              <Typography variant="body1">{value.overview}</Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};
