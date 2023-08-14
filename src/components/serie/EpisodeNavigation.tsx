import {
  Button,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { percent } from "csx";
import { useTranslation } from "react-i18next";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { Season } from "src/models/tmdb/tv/Season";
import { useEffect, useState } from "react";
import { range } from "src/utils/array";
import { NavigateEpisodeSkeleton } from "../commun/skeleton/Skeleton";

interface Props {
  serieId: number;
  season: number;
  episode: number;
  seasons: Array<Season>;
  isLoading?: boolean;
}
export const EpisodeNavigation = ({
  serieId,
  episode,
  season,
  seasons,
  isLoading = false,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [seasonNavigate, setSeasonNavigate] = useState(season.toString());
  const [episodeNavigate, setEpisodeNavigate] = useState(episode.toString());

  const seasonSelect = seasons.find((el) => el.season_number === season);
  const seasonNavigateSelect: Season | undefined = seasons.find(
    (el) => el.season_number === Number(seasonNavigate)
  );

  useEffect(() => {
    setSeasonNavigate(season.toString());
  }, [season]);

  useEffect(() => {
    setEpisodeNavigate(episode.toString());
  }, [episode]);

  useEffect(() => {
    if (
      seasonNavigateSelect &&
      Number(episodeNavigate) > seasonNavigateSelect.episode_count
    ) {
      setEpisodeNavigate(seasonNavigateSelect.episode_count.toString());
    }
  }, [seasonNavigateSelect]);

  const selectSeason = (event: SelectChangeEvent) => {
    setSeasonNavigate(event.target.value as string);
  };

  const selectEpisode = (event: SelectChangeEvent) => {
    setEpisodeNavigate(event.target.value as string);
  };

  const goToPreviousEpisode = () => {
    let newEpisode: number | undefined = episode - 1;
    let newSeason: Season | undefined = seasonSelect;
    if (newEpisode <= 0) {
      newSeason = seasons.find((el) => el.season_number === season - 1);
      newEpisode = newSeason ? newSeason.episode_count : undefined;
    }

    if (newSeason && newEpisode) {
      navigate(
        `/serie/${serieId}/season/${newSeason.season_number}/episode/${newEpisode}`
      );
    }
  };

  const isPreviousDisabled = () => {
    const isPrevEpisode = episode - 1 > 0;
    if (isPrevEpisode) {
      return false;
    } else {
      let newSeason: Season | undefined = seasonSelect;
      newSeason = seasons.find((el) => el.season_number === season - 1);
      return newSeason === undefined;
    }
  };

  const goToNextEpisode = () => {
    let newEpisode: number | undefined = episode + 1;
    let newSeason: Season | undefined = seasonSelect;
    if (seasonSelect && newEpisode > seasonSelect.episode_count) {
      newSeason = seasons.find((el) => el.season_number === season + 1);
      newEpisode = newSeason ? 1 : undefined;
    }

    if (newSeason && newEpisode) {
      navigate(
        `/serie/${serieId}/season/${newSeason.season_number}/episode/${newEpisode}`
      );
    }
  };

  const isNextDisabled = () => {
    const isNextEpisode =
      seasonSelect && episode + 1 <= seasonSelect.episode_count;
    if (isNextEpisode) {
      return false;
    } else {
      let newSeason: Season | undefined = seasonSelect;
      newSeason = seasons.find((el) => el.season_number === season + 1);
      return newSeason === undefined;
    }
  };

  const navigateTo = () => {
    navigate(
      `/serie/${serieId}/season/${seasonNavigate}/episode/${episodeNavigate}`
    );
  };

  return (
    <Paper
      sx={{
        position: "sticky",
        top: "0px",
        padding: 1,
        marginTop: 2,
        width: percent(100),
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        zIndex: 5,
      }}
      elevation={3}
    >
      {isLoading ? (
        <NavigateEpisodeSkeleton />
      ) : (
        <>
          <Button
            variant="text"
            color="secondary"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => goToPreviousEpisode()}
            disabled={isPreviousDisabled()}
          >
            <Typography variant="body1">{t("commun.episodeprev")}</Typography>
          </Button>
          <div style={{ display: "flex", gap: 10 }}>
            <Select
              id="season-navigation"
              value={seasonNavigate}
              onChange={selectSeason}
              size="small"
            >
              {seasons.map((el) => (
                <MenuItem key={el.id} value={el.season_number}>
                  {el.name}
                </MenuItem>
              ))}
            </Select>
            <Select
              id="episode-navigation"
              value={episodeNavigate}
              onChange={selectEpisode}
              size="small"
            >
              {range(
                1,
                seasonNavigateSelect ? seasonNavigateSelect.episode_count : 1
              ).map((el) => (
                <MenuItem key={el} value={el}>{`${t(
                  "commun.episode"
                )} ${el}`}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="secondary" onClick={navigateTo}>
              GO
            </Button>
          </div>
          <Button
            variant="text"
            color="secondary"
            endIcon={<ArrowForwardIosIcon />}
            onClick={() => goToNextEpisode()}
            disabled={isNextDisabled()}
          >
            <Typography variant="body1">{t("commun.episodenext")}</Typography>
          </Button>
        </>
      )}
    </Paper>
  );
};
