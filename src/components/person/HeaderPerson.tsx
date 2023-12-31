import { Grid, IconButton, Typography } from "@mui/material";
import { percent } from "csx";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getPersonExternalId } from "src/api/person";
import { PersonDetails } from "src/models/person/PersonDetails";
import { openInNewTab } from "src/utils/navigation";
import { style } from "typestyle";
import { ExternalIdBlock } from "../commun/ExternalIdBlock";
import { ImageNotFoundBlock } from "../commun/ImageBlock";
import { HeaderPersonSkeleton } from "../commun/skeleton/HeaderPersonSkeleton";

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
      <Grid item xs={12} sm={3}>
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
        <>
          <Grid item xs={12} sm={9}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md="auto" sx={{ display: "flex", gap: 1 }}>
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
              </Grid>
              <Grid item xs={12} md="auto">
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
                    {`${moment(detail.deathday).format(
                      "DD MMMM YYYY"
                    )} (${moment(detail.deathday).diff(
                      detail.birthday,
                      "years",
                      false
                    )} ${t("commun.years")})`}
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
                <Grid
                  item
                  md={12}
                  display={{ xs: "none", sm: "none", md: "block" }}
                >
                  <Typography variant="h4">{t("commun.biography")}</Typography>
                  <Typography variant="body1">{detail.biography}</Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          {detail.biography !== "" && (
            <Grid
              item
              xs={12}
              sm={12}
              display={{ xs: "block", sm: "block", md: "none" }}
            >
              <Typography variant="h4">{t("commun.biography")}</Typography>
              <Typography variant="body1">{detail.biography}</Typography>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
};
