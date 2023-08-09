import { Grid, Typography } from "@mui/material";
import { percent } from "csx";
import { useTranslation } from "react-i18next";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { PersonDetails } from "src/models/tmdb/person/PersonDetails";

const posterCss = style({
  width: percent(100),
});

interface Props {
  detail?: PersonDetails;
}

export const HeaderPerson = ({ detail }: Props) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {detail && detail.profile_path !== null ? (
          <img
            src={`https://image.tmdb.org/t/p/original${detail.profile_path}`}
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
              <Typography variant="h1">{detail.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4">
                {t("pages.person.biography")}
              </Typography>
              <Typography variant="body2">{detail.biography}</Typography>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
