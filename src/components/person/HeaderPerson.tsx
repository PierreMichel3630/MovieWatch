import { Grid, IconButton, Typography } from "@mui/material";
import { percent } from "csx";
import { useTranslation } from "react-i18next";
import { style } from "typestyle";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { PersonDetails } from "src/models/tmdb/person/PersonDetails";
import moment from "moment";
import { ExternalIdBlock } from "../commun/ExternalIdBlock";
import { useEffect, useState } from "react";
import { getPersonExternalId } from "src/api/tmdb/person";
import { useParams } from "react-router-dom";
import { HeaderPersonSkeleton } from "../commun/skeleton/HeaderPersonSkeleton";
import { openInNewTab } from "src/utils/navigation";

import LinkIcon from "@mui/icons-material/Link";

const posterCss = style({
  width: percent(100),
});

interface Props {
  detail?: PersonDetails;
  isLoading?: boolean;
}

export const HeaderPerson = ({ detail, isLoading = false }: Props) => {
  let { id } = useParams();
  const { t } = useTranslation();

  const [externalId, setExternalId] = useState<undefined | ExternalId>(
    undefined
  );

  useEffect(() => {
    if (id) {
      getPersonExternalId(Number(id)).then((res) => {
        setExternalId(res);
      });
    }
  }, [id]);

  return isLoading ? (
    <HeaderPersonSkeleton />
  ) : (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        {detail &&
          (detail.profile_path !== null ? (
            <img
              src={`https://image.tmdb.org/t/p/original${detail.profile_path}`}
              className={posterCss}
            />
          ) : (
            <ImageNotFoundBlock style={{ aspectRatio: "2/3" }} />
          ))}
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
              {detail.homepage !== null && detail.homepage !== "" && (
                <IconButton
                  aria-label="homepage"
                  size="medium"
                  onClick={() => openInNewTab(detail.homepage as string)}
                >
                  <LinkIcon fontSize="medium" />
                </IconButton>
              )}
              {externalId && <ExternalIdBlock externalId={externalId} />}
            </Grid>
            {detail.birthday !== null && (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ marginRight: 2 }}
                >
                  {t("commun.birthday")}
                </Typography>
                <Typography variant="body1" component="span">
                  {moment(detail.birthday).format("DD MMMM YYYY")}{" "}
                  {detail.deathday === null &&
                    `(${moment().diff(detail.birthday, "years", false)} ${t(
                      "commun.years"
                    )})`}
                </Typography>
              </Grid>
            )}
            {detail.deathday !== null && (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ marginRight: 2 }}
                >
                  {t("commun.deathday")}
                </Typography>
                <Typography variant="body1" component="span">
                  {`${moment(detail.deathday).format("DD MMMM YYYY")} (${moment(
                    detail.deathday
                  ).diff(detail.birthday, "years", false)} ${t(
                    "commun.years"
                  )})`}
                </Typography>
              </Grid>
            )}
            {detail.place_of_birth !== null && (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  component="span"
                  sx={{ marginRight: 2 }}
                >
                  {t("commun.placeofbirth")}
                </Typography>
                <Typography variant="body1" component="span">
                  {detail.place_of_birth}
                </Typography>
              </Grid>
            )}
            {detail.biography !== "" && (
              <Grid item xs={12}>
                <Typography variant="h4">
                  {t("pages.person.biography")}
                </Typography>
                <Typography variant="body2">{detail.biography}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
