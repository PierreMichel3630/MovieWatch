import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { percent, px } from "csx";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "./ImageBlock";
import { Cast } from "src/models/tmdb/commun/Cast";
import { EpisodeDetail } from "src/models/tmdb/tv/EpisodeDetail";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
});

interface PropsPerson {
  value: Cast;
}

export const CardPerson = ({ value }: PropsPerson) => {
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
      </CardContent>
    </Card>
  );
};

interface PropsEpisode {
  value: EpisodeDetail;
}

export const CardEpisode = ({ value }: PropsEpisode) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() =>
        navigate(
          `/serie/${value.show_id}/season/${value.season_number}/episode/${value.episode_number}`
        )
      }
      className={cardCss}
    >
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
              S{value.season_number}.E{value.episode_number} -{value.name}
            </Typography>
            <Typography variant="body1">{value.overview}</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
