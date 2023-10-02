import { Alert, Chip, Grid, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "src/App";
import { Review } from "src/models/commun/Review";
import { Colors } from "src/style/Colors";
import { getBreakpoint } from "src/utils/mediaQuery";
import { isAllPropertiesFalse, isAllPropertiesTrue } from "src/utils/object";
import { AvatarLanguage } from "./commun/Avatar";
import { ReviewMessage } from "./commun/ReviewMessage";
import { ReviewSkeleton } from "./commun/skeleton/Skeleton";

interface Props {
  reviews: Array<Review>;
  isLoading?: boolean;
}

export const ReviewBlock = ({ reviews, isLoading }: Props) => {
  const NUMBERLINESHOW = 2;
  const { t } = useTranslation();
  const { language } = useContext(UserContext);

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    xl: 1,
  }[breakpoint];
  const itemPerLine = cols * NUMBERLINESHOW;

  const [filterLanguage, setFilterLanguage] = useState({
    english: false,
    locale: false,
  });

  const [filterRanking, setFilterRanking] = useState({
    excellent: false, // > 9
    good: false, // 7>9
    average: false, // 5 > 7
    bad: false, //<5
  });

  const reviewsFilter = reviews.filter((review) => {
    let resultLanguage = false;
    let resultRanking = false;
    if (isAllPropertiesFalse(filterRanking)) {
      resultRanking = true;
    } else {
      if (isAllPropertiesTrue(filterRanking)) {
        resultRanking = true;
      } else {
        if (filterRanking.excellent) {
          resultRanking =
            resultRanking ||
            (review.author_details.rating !== null &&
              review.author_details.rating >= 9);
        }
        if (filterRanking.good) {
          resultRanking =
            resultRanking ||
            (review.author_details.rating !== null &&
              review.author_details.rating < 9 &&
              review.author_details.rating >= 7);
        }
        if (filterRanking.average) {
          resultRanking =
            resultRanking ||
            (review.author_details.rating !== null &&
              review.author_details.rating < 7 &&
              review.author_details.rating >= 5);
        }
        if (filterRanking.bad) {
          resultRanking =
            resultRanking ||
            (review.author_details.rating !== null &&
              review.author_details.rating < 5);
        }
      }
    }
    if (isAllPropertiesFalse(filterLanguage)) {
      resultLanguage = true;
    } else {
      if (isAllPropertiesTrue(filterLanguage)) {
        resultLanguage = true;
      } else {
        if (filterLanguage.english) {
          resultLanguage = resultLanguage || review.language === "en";
        }
        if (filterLanguage.locale) {
          resultLanguage =
            resultLanguage || review.language === language.iso_639_1;
        }
      }
    }
    return resultLanguage && resultRanking;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs="auto">
            <Typography variant="h2">{t("commun.review")}</Typography>
          </Grid>
          <Grid item>
            <Chip
              label="English"
              avatar={<AvatarLanguage iso="en" />}
              variant={filterLanguage.english ? "filled" : "outlined"}
              onClick={() =>
                setFilterLanguage((prev) => ({
                  ...prev,
                  english: !prev.english,
                }))
              }
            />
          </Grid>
          <Grid item>
            <Chip
              label={language.name}
              avatar={<AvatarLanguage iso={language.iso_639_1} />}
              variant={filterLanguage.locale ? "filled" : "outlined"}
              onClick={() =>
                setFilterLanguage((prev) => ({
                  ...prev,
                  locale: !prev.locale,
                }))
              }
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("review.ranking.excellent")}
              onClick={() =>
                setFilterRanking((prev) => ({
                  ...prev,
                  excellent: !prev.excellent,
                }))
              }
              sx={{
                backgroundColor: Colors.green,
                border: `${filterRanking.excellent ? 4 : 0}px solid ${
                  Colors.green2
                }`,
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("review.ranking.good")}
              onClick={() =>
                setFilterRanking((prev) => ({
                  ...prev,
                  good: !prev.good,
                }))
              }
              sx={{
                backgroundColor: Colors.yellow,
                border: `${filterRanking.good ? 4 : 0}px solid ${
                  Colors.yellow2
                }`,
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("review.ranking.average")}
              onClick={() =>
                setFilterRanking((prev) => ({
                  ...prev,
                  average: !prev.average,
                }))
              }
              sx={{
                backgroundColor: Colors.orange,
                border: `${filterRanking.average ? 4 : 0}px solid ${
                  Colors.orange2
                }`,
              }}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("review.ranking.bad")}
              onClick={() =>
                setFilterRanking((prev) => ({
                  ...prev,
                  bad: !prev.bad,
                }))
              }
              sx={{
                backgroundColor: Colors.red,
                border: `${filterRanking.bad ? 4 : 0}px solid ${Colors.red2}`,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {isLoading ? (
        Array.from(new Array(itemPerLine)).map((_, index) => (
          <Grid key={index} item xs={12 / cols}>
            <ReviewSkeleton />
          </Grid>
        ))
      ) : reviews.length > 0 ? (
        reviewsFilter.length > 0 ? (
          reviewsFilter.map((review) => (
            <Grid item xs={12}>
              <ReviewMessage review={review} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Alert severity="warning">{t("commun.noresult")}</Alert>
          </Grid>
        )
      ) : (
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Alert severity="warning">{t("commun.noresultreview")}</Alert>
        </Grid>
      )}
    </Grid>
  );
};
