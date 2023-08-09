import { useState } from "react";

import { Button, Chip, Grid, Typography } from "@mui/material";
import { percent } from "csx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";

import VideocamIcon from "@mui/icons-material/Videocam";
import { VideoDialog } from "../commun/dialog/VideoDialog";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { MovieDetails } from "src/models/tmdb/movie/MovieDetails";
import { Backdrop } from "src/models/tmdb/commun/Backdrop";
import { Video } from "src/models/tmdb/commun/Video";
import { MediaType } from "src/models/tmdb/enum";

const posterCss = style({
  width: percent(100),
});

interface Props {
  detail?: MovieDetails;
  poster?: Backdrop;
  videos: Array<Video>;
}

export const HeaderMovie = ({ detail, poster, videos }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const trailers = videos.filter((video) => video.type === "Trailer");

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/original${poster.file_path}`}
            className={posterCss}
          />
        ) : (
          <ImageNotFoundBlock style={{ aspectRatio: "2/3" }} />
        )}
      </Grid>
      {detail && (
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              <Typography variant="h1">{detail.title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {detail.genres.map((genre) => (
                  <Grid item>
                    <Chip
                      label={genre.name}
                      variant={"filled"}
                      onClick={() =>
                        navigate({
                          pathname: `/genres`,
                          search: `?page=1&type=${MediaType.movie}&genres=${genre.id}`,
                        })
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}
            >
              {trailers.length > 0 && (
                <Button
                  variant="contained"
                  color="inherit"
                  startIcon={<VideocamIcon />}
                  onClick={() => setOpen(true)}
                >
                  <Typography variant="h6">
                    {t("pages.movie.trailer")}
                  </Typography>
                </Button>
              )}
              <Typography variant="h6">
                {detail.runtime} {t("pages.movie.minutes")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">{t("pages.movie.summary")}</Typography>
              <Typography variant="body2">{detail.overview}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
      {trailers.length > 0 && (
        <VideoDialog
          videos={trailers}
          onClose={() => setOpen(false)}
          open={open}
        />
      )}
    </Grid>
  );
};
