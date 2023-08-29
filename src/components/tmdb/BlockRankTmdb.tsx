import { Alert, Chip, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "src/App";
import {
  deleteRank,
  getRanksByUserAndThemeAndType,
} from "src/api/supabase/rank";
import { useAuth } from "src/context/AuthProviderSupabase";
import { RankDetail } from "src/models/Rank";
import { MediaType } from "src/models/tmdb/enum";
import { THEMETMDB } from "src/routes/movieRoutes";
import { CardSkeleton } from "../commun/skeleton/Skeleton";
import { MessageSnackbar } from "../commun/Snackbar";
import { CardRankTmdb } from "../commun/Card";
import { ItemToRank } from "src/pages/tmdb/HomeMoviesPage";
import { RankTMDBDialog } from "../dialog/RankTMDBDialog";

export const BlockRankTmdb = () => {
  const ITEMPERPAGE = 20;

  const { t } = useTranslation();
  const { language } = useContext(UserContext);
  const { user } = useAuth();

  const [filter, setFilter] = useState<MediaType>(MediaType.movie);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ranks, setRanks] = useState<Array<RankDetail>>([]);
  const [message, setMessage] = useState("");
  const [openModalRate, setOpenModalRate] = useState(false);
  const [itemToRank, setItemToRank] = useState<ItemToRank | undefined>(
    undefined
  );

  const selectFilter = (value: MediaType) => {
    setFilter(value);
  };

  const getAllRanks = async () => {
    if (user && language) {
      const { data } = await getRanksByUserAndThemeAndType(
        THEMETMDB,
        user.id,
        filter.toString()
      );
      if (data) {
        setRanks(data as Array<RankDetail>);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllRanks();
  }, [user, language, filter]);

  const removeRank = async (rank: RankDetail) => {
    const { error } = await deleteRank(rank.id);
    if (error) {
      setMessage(t("commun.error"));
    } else {
      getAllRanks();
      setMessage("");
    }
  };

  const rateRank = async (rank: ItemToRank) => {
    setItemToRank(rank);
    setOpenModalRate(true);
  };

  const closeModalRank = () => {
    setItemToRank(undefined);
    setOpenModalRate(false);
  };

  const refreshRank = () => {
    closeModalRank();
    getAllRanks();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Chip
              label={t("commun.movies")}
              variant={
                filter && filter === MediaType.movie ? "filled" : "outlined"
              }
              onClick={() => selectFilter(MediaType.movie)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.series")}
              variant={
                filter && filter === MediaType.tv ? "filled" : "outlined"
              }
              onClick={() => selectFilter(MediaType.tv)}
            />
          </Grid>
          <Grid item>
            <Chip
              label={t("commun.persons")}
              variant={
                filter && filter === MediaType.person ? "filled" : "outlined"
              }
              onClick={() => selectFilter(MediaType.person)}
            />
          </Grid>
        </Grid>
      </Grid>
      {isLoading ? (
        Array.from(new Array(ITEMPERPAGE)).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <CardSkeleton />
          </Grid>
        ))
      ) : ranks.length > 0 ? (
        ranks.map((rank) => (
          <Grid key={rank.id} item xs={12} sm={6} md={4} lg={3} xl={3}>
            <CardRankTmdb
              rank={rank}
              rate={rateRank}
              remove={() => removeRank(rank)}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <Alert severity="warning">{t("commun.noresult")}</Alert>
        </Grid>
      )}
      {itemToRank && (
        <RankTMDBDialog
          open={openModalRate}
          close={closeModalRank}
          value={itemToRank}
          validate={refreshRank}
        />
      )}
      <MessageSnackbar
        open={message !== ""}
        handleClose={() => setMessage("")}
        message={message}
      />
    </Grid>
  );
};
