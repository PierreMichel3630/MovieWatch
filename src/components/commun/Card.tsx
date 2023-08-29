import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { percent, px } from "csx";
import { Link } from "react-router-dom";
import { classes, style } from "typestyle";
import { ImageNotFoundBlock } from "./ImageBlock";
import { Cast } from "src/models/tmdb/commun/Cast";
import { EpisodeDetail } from "src/models/tmdb/tv/EpisodeDetail";
import { TvAggregateCreditCast } from "src/models/tmdb/tv/TvAggregateCreditCast";
import { useTranslation } from "react-i18next";
import { GuestStar } from "src/models/tmdb/commun/GuestStar";
import { ThemeView } from "src/models/Theme";
import {
  BUCKET_THEME,
  BUCKET_VALUE,
  getUrlPublic,
} from "src/api/supabase/storage";
import { ValueView } from "src/models/Value";
import { Rank, RankDetail } from "src/models/Rank";
import { Colors } from "src/style/Colors";

import { VoteBadge } from "./VoteBadge";
import { UserContext } from "src/App";
import { useContext, useEffect, useState } from "react";
import { DEFAULT_ISO_LANGUAGE } from "src/api/supabase/language";
import { AvatarGroupFlag } from "./Avatar";
import { TranslateForm } from "../form/TranslateForm";
import { BASEURLMOVIE, THEMETMDB } from "src/routes/movieRoutes";
import { MediaType } from "src/models/tmdb/enum";
import { getPersonDetails } from "src/api/tmdb/person";
import { getTvDetails } from "src/api/tmdb/tv";
import { getMovieDetails } from "src/api/tmdb/movie";
import {
  ItemToCheck,
  ItemToRank,
  RankContext,
} from "src/pages/tmdb/HomeMoviesPage";
import { getRanksByIdExtern } from "src/api/supabase/rank";

import StarRateIcon from "@mui/icons-material/StarRate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const cardCss = style({
  cursor: "pointer",
  height: percent(100),
  display: "flex",
  flexDirection: "column",
});

const cardHeightCss = style({
  height: percent(100),
});

interface PropsPerson {
  value: Cast;
}

export const CardPerson = ({ value }: PropsPerson) => {
  const { t } = useTranslation();
  const { setItemToRank, setItemToCheck, refresh, setRefresh } =
    useContext(RankContext);

  const [rank, setRank] = useState<null | Rank>(null);
  const [isLoadingRank, setIsLoadingRank] = useState(true);

  const getRank = async () => {
    if (value) {
      const { data } = await getRanksByIdExtern(
        value.id,
        THEMETMDB,
        MediaType.person
      );
      setRank(data as Rank);
      setIsLoadingRank(false);
    }
  };

  useEffect(() => {
    if (refresh && refresh === value.id) {
      setIsLoadingRank(true);
      getRank();
      setRefresh(undefined);
    }
  }, [refresh]);

  useEffect(() => {
    setIsLoadingRank(true);
    getRank();
  }, [value]);

  const rankPerson = (event: any) => {
    event.preventDefault();
    if (value) {
      const item: ItemToRank = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
      };
      setItemToRank(item);
    }
  };

  const checkPerson = (event: any, isSee: boolean) => {
    event.preventDefault();
    if (value) {
      const item: ItemToCheck = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
        isSee,
        idRank: rank !== null ? rank.id : undefined,
      };
      setItemToCheck(item);
    }
  };

  const isCheck = rank !== null;

  return (
    <Link to={`${BASEURLMOVIE}/person/${value.id}`}>
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
        <CardContent sx={{ position: "relative", mt: 1, p: 1, pb: 0 }}>
          <Typography variant="h4">{value.name}</Typography>
          <Typography variant="caption">{value.character}</Typography>
          <Typography variant="h6">{value.known_for_department}</Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "flex-end",
            display: "flex",
            gap: px(5),
            mt: "auto",
          }}
        >
          {!isLoadingRank && (
            <>
              {isCheck ? (
                <Tooltip title={t("commun.notseeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, false)}
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={t("commun.seeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, true)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t("commun.rankactor")}>
                <IconButton
                  aria-label="Rate"
                  size="small"
                  onClick={(event) => rankPerson(event)}
                >
                  <StarRateIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

interface PropsPersonTv {
  value: TvAggregateCreditCast;
}

export const CardPersonTv = ({ value }: PropsPersonTv) => {
  const { t } = useTranslation();
  const { setItemToRank, setItemToCheck, refresh, setRefresh } =
    useContext(RankContext);

  const [rank, setRank] = useState<null | Rank>(null);
  const [isLoadingRank, setIsLoadingRank] = useState(true);

  const getRank = async () => {
    if (value) {
      const { data } = await getRanksByIdExtern(
        value.id,
        THEMETMDB,
        MediaType.person
      );
      setRank(data as Rank);
      setIsLoadingRank(false);
    }
  };

  useEffect(() => {
    if (refresh && refresh === value.id) {
      setIsLoadingRank(true);
      getRank();
      setRefresh(undefined);
    }
  }, [refresh]);

  useEffect(() => {
    setIsLoadingRank(true);
    getRank();
  }, [value]);

  const rankPerson = (event: any) => {
    event.preventDefault();
    if (value) {
      const item: ItemToRank = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
      };
      setItemToRank(item);
    }
  };

  const checkPerson = (event: any, isSee: boolean) => {
    event.preventDefault();
    if (value) {
      const item: ItemToCheck = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
        isSee,
        idRank: rank !== null ? rank.id : undefined,
      };
      setItemToCheck(item);
    }
  };

  const isCheck = rank !== null;

  return (
    <Link to={`${BASEURLMOVIE}/person/${value.id}`}>
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
        <CardContent sx={{ position: "relative", mt: 1, p: 1, pb: 0 }}>
          <Typography variant="h4">{value.name}</Typography>
          {value.roles.map((role, index) => (
            <Typography key={index} variant="caption" component="p">{`${
              role.character
            } (${role.episode_count} ${t("commun.episodes")})`}</Typography>
          ))}
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "flex-end",
            display: "flex",
            gap: px(5),
            mt: "auto",
          }}
        >
          {!isLoadingRank && (
            <>
              {isCheck ? (
                <Tooltip title={t("commun.notseeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, false)}
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={t("commun.seeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, true)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t("commun.rankactor")}>
                <IconButton
                  aria-label="Rate"
                  size="small"
                  onClick={(event) => rankPerson(event)}
                >
                  <StarRateIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

interface PropsPersonGuest {
  value: GuestStar;
}

export const CardPersonGuest = ({ value }: PropsPersonGuest) => {
  const { t } = useTranslation();
  const { setItemToRank, setItemToCheck, refresh, setRefresh } =
    useContext(RankContext);

  const [rank, setRank] = useState<null | Rank>(null);
  const [isLoadingRank, setIsLoadingRank] = useState(true);

  const getRank = async () => {
    if (value) {
      const { data } = await getRanksByIdExtern(
        value.id,
        THEMETMDB,
        MediaType.person
      );
      setRank(data as Rank);
      setIsLoadingRank(false);
    }
  };

  useEffect(() => {
    if (refresh && refresh === value.id) {
      setIsLoadingRank(true);
      getRank();
      setRefresh(undefined);
    }
  }, [refresh]);

  useEffect(() => {
    setIsLoadingRank(true);
    getRank();
  }, [value]);

  const rankPerson = (event: any) => {
    event.preventDefault();
    if (value) {
      const item: ItemToRank = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
      };
      setItemToRank(item);
    }
  };

  const checkPerson = (event: any, isSee: boolean) => {
    event.preventDefault();
    if (value) {
      const item: ItemToCheck = {
        id: value.id,
        name: value.name,
        description: "",
        image: `https://image.tmdb.org/t/p/original${value.profile_path}`,
        type: MediaType.person,
        isSee,
        idRank: rank !== null ? rank.id : undefined,
      };
      setItemToCheck(item);
    }
  };

  const isCheck = rank !== null;

  return (
    <Link to={`${BASEURLMOVIE}/person/${value.id}`}>
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
        <CardContent sx={{ position: "relative", mt: 1, p: 1, pb: 0 }}>
          <Typography variant="h4">{value.name}</Typography>
          <Typography variant="caption">{value.character}</Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            justifyContent: "flex-end",
            display: "flex",
            gap: px(5),
            mt: "auto",
          }}
        >
          {!isLoadingRank && (
            <>
              {isCheck ? (
                <Tooltip title={t("commun.notseeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, false)}
                  >
                    <VisibilityOffIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title={t("commun.seeactor")}>
                  <IconButton
                    aria-label="Check"
                    size="small"
                    onClick={(event) => checkPerson(event, true)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={t("commun.rankactor")}>
                <IconButton
                  aria-label="Rate"
                  size="small"
                  onClick={(event) => rankPerson(event)}
                >
                  <StarRateIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </CardActions>
      </Card>
    </Link>
  );
};

interface PropsEpisode {
  value: EpisodeDetail;
}

export const CardEpisode = ({ value }: PropsEpisode) => {
  const { t } = useTranslation();
  return (
    <Link
      to={`${BASEURLMOVIE}/tv/${value.show_id}/season/${value.season_number}/episode/${value.episode_number}`}
    >
      <Card className={cardCss}>
        <Grid container>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={8}>
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

interface PropsCardTheme {
  value: ThemeView;
}

export const CardTheme = ({ value }: PropsCardTheme) => {
  const { language } = useContext(UserContext);
  const { t } = useTranslation();

  const tradLocalLanguage = value.trads.find((el) => el.iso === language.iso);
  const tradEnglish = value.trads.find((el) => el.iso === DEFAULT_ISO_LANGUAGE);

  const trad = tradLocalLanguage ? tradLocalLanguage : tradEnglish;

  return (
    <Link to={`/theme/${value.id}`}>
      <Card className={cardHeightCss}>
        <CardMedia
          sx={{
            width: percent(100),
            aspectRatio: "auto",
            minHeight: px(250),
          }}
          image={getUrlPublic(BUCKET_THEME, value.image)}
          title={trad ? trad.name : ""}
        />
        <CardContent sx={{ position: "relative" }}>
          {trad && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  transform: "translate(0%,-50%)",
                }}
              >
                <AvatarGroupFlag ids={value.languages} />
              </div>
              <Typography variant="h4">{trad.name}</Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {trad.description}
              </Typography>
            </>
          )}
          {tradLocalLanguage === undefined && (
            <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
              {t("commun.notavailableinyourlanguage")}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

const cardCheckCss = style({
  border: `4px solid ${Colors.green}`,
});

interface PropsCardValue {
  value: ValueView;
  check: () => void;
  rate: () => void;
  remove: (rank: Rank | undefined) => void;
  ranks: Array<Rank>;
}

export const CardValue = ({
  ranks,
  value,
  check,
  rate,
  remove,
}: PropsCardValue) => {
  const { t } = useTranslation();
  const { language } = useContext(UserContext);

  const tradLocalLanguage = value.trads.find((el) => el.iso === language.iso);
  const tradEnglish = value.trads.find((el) => el.iso === DEFAULT_ISO_LANGUAGE);

  const trad = tradLocalLanguage ? tradLocalLanguage : tradEnglish;

  const rank = ranks.find((el) => value.id === el.value.id);
  const isCheck = rank !== undefined;

  return (
    <Card
      className={isCheck ? classes(cardHeightCss, cardCheckCss) : cardHeightCss}
    >
      <CardMedia
        sx={{
          width: percent(100),
          aspectRatio: "auto",
          height: percent(100),
          minHeight: px(250),
        }}
        image={getUrlPublic(BUCKET_VALUE, value.image)}
      />
      <CardContent sx={{ position: "relative", mt: 1 }}>
        {isCheck && (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: percent(2),
              transform: "translate(0%,-65%)",
            }}
          >
            <VoteBadge value={rank.notation} />
          </div>
        )}
        {trad && (
          <>
            <Typography variant="h4">{trad.name}</Typography>
            <Tooltip title={trad.description} placement="top">
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {trad.description}
              </Typography>
            </Tooltip>
          </>
        )}
        {tradLocalLanguage === undefined && (
          <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
            {t("commun.notavailableinyourlanguage")}
          </Alert>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", display: "flex" }}>
        {isCheck ? (
          <IconButton aria-label="Check" onClick={() => remove(rank)}>
            <ClearIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="Check" onClick={check}>
            <CheckIcon />
          </IconButton>
        )}
        <IconButton aria-label="Rate" onClick={rate}>
          <StarRateIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

interface PropsCardValueTranslate {
  value: ValueView;
}

export const CardValueTranslate = ({ value }: PropsCardValueTranslate) => {
  const { language } = useContext(UserContext);

  const tradLocalLanguage = value.trads.find((el) => el.iso === language.iso);

  const tradEnglish = value.trads.find((el) => el.iso === DEFAULT_ISO_LANGUAGE);
  const firstTrad = value.trads[0];

  const trad = tradLocalLanguage
    ? tradLocalLanguage
    : tradEnglish
    ? tradEnglish
    : firstTrad;

  return (
    <Card className={cardHeightCss} sx={{ padding: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <CardMedia
            sx={{
              width: percent(100),
              aspectRatio: "auto",
              height: percent(100),
              minHeight: px(250),
            }}
            image={getUrlPublic(BUCKET_VALUE, value.image)}
          />
        </Grid>
        <Grid item xs={4}>
          {trad && (
            <>
              <Typography variant="h4">{trad.name}</Typography>
              <Typography variant="body1">{trad.description}</Typography>
            </>
          )}
        </Grid>
        <Grid item xs={5}>
          <TranslateForm
            idValue={value.id}
            validate={() => console.log("validate")}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

interface PropsCardRank {
  rank: RankDetail;
  rate: () => void;
  remove: () => void;
}

export const CardRank = ({ rank, rate, remove }: PropsCardRank) => {
  const { t } = useTranslation();
  const { language } = useContext(UserContext);
  const isTradLocal = language.id === rank.language;

  return (
    <Card className={cardHeightCss}>
      <CardMedia
        sx={{
          width: percent(100),
          aspectRatio: "auto",
          maxHeight: percent(100),
          minHeight: px(250),
        }}
        image={getUrlPublic(BUCKET_VALUE, rank.image)}
        title={rank.name}
      />
      <CardContent sx={{ position: "relative", mt: 1 }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: percent(2),
            transform: "translate(0%,-65%)",
          }}
        >
          <VoteBadge value={rank.notation} />
        </div>

        {isTradLocal ? (
          <>
            <Typography variant="h4">{rank.name}</Typography>
            <Tooltip title={rank.description} placement="top">
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {rank.description}
              </Typography>
            </Tooltip>
          </>
        ) : (
          <Alert severity="info" variant="outlined" sx={{ mt: 1 }}>
            {t("commun.notavailableinyourlanguage")}
          </Alert>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", display: "flex" }}>
        <IconButton aria-label="Remove" onClick={remove}>
          <ClearIcon />
        </IconButton>
        <IconButton aria-label="Rate" onClick={rate}>
          <StarRateIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

interface PropsCardRankTmdb {
  rank: RankDetail;
  rate: (value: ItemToRank) => void;
  remove: () => void;
}

export const CardRankTmdb = ({ rank, rate, remove }: PropsCardRankTmdb) => {
  const { language } = useContext(UserContext);

  const [value, setValue] = useState<undefined | ItemToRank>(undefined);
  const [loading, setLoading] = useState(true);

  const getItemTMDB = () => {
    const id = rank.id_extern;
    if (language && id !== null) {
      switch (rank.type as MediaType) {
        case MediaType.tv:
          getTvDetails(Number(id), language.iso).then((res) => {
            setValue({
              id: Number(id),
              name: res.name,
              image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
              description: res.overview,
              type: MediaType.tv,
            });
            setLoading(false);
          });
          break;
        case MediaType.movie:
          getMovieDetails(Number(id), language.iso).then((res) => {
            setValue({
              id: Number(id),
              name: res.title,
              image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
              description: res.overview,
              type: MediaType.movie,
            });
            setLoading(false);
          });
          break;
        case MediaType.person:
          getPersonDetails(Number(id), language.iso).then((res) => {
            setValue({
              id: Number(id),
              name: res.name,
              image: `https://image.tmdb.org/t/p/w500${res.profile_path}`,
              description: res.biography,
              type: MediaType.person,
            });
            setLoading(false);
          });
          break;
        default:
          getMovieDetails(Number(id), language.iso).then((res) => {
            setValue({
              id: Number(id),
              name: res.title,
              image: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
              description: res.overview,
              type: MediaType.movie,
            });
            setLoading(false);
          });
          break;
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    getItemTMDB();
  }, [rank, language]);

  const removeRank = (event: any) => {
    event.preventDefault();
    remove();
  };

  const rateRank = (event: any, el: ItemToRank) => {
    event.preventDefault();
    rate(el);
  };

  return (
    <Card className={cardHeightCss} sx={{ cursor: "pointer" }}>
      {loading || value === undefined ? (
        <>
          <Skeleton
            variant="rectangular"
            sx={{ width: percent(100), height: px(250) }}
          />
          <CardContent>
            <Skeleton width="60%" />
            <Skeleton width="20%" />
          </CardContent>
        </>
      ) : (
        <Link to={`${BASEURLMOVIE}/${value.type.toString()}/${value.id}`}>
          <CardMedia
            sx={{
              width: percent(100),
              aspectRatio: "2/3",
              minHeight: px(300),
            }}
            image={value.image}
            title={value.name}
          />
          <CardContent sx={{ position: "relative", mt: 1 }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                right: percent(2),
                transform: "translate(0%,-65%)",
              }}
            >
              <VoteBadge value={rank.notation} tooltip={rank.opinion} />
            </div>
            <Typography variant="h4">{value.name}</Typography>
            <Tooltip title={value.description} placement="bottom">
              <Typography
                variant="body1"
                sx={{
                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                }}
              >
                {value.description}
              </Typography>
            </Tooltip>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end", display: "flex" }}>
            <IconButton
              aria-label="Remove"
              onClick={(event) => removeRank(event)}
            >
              <ClearIcon />
            </IconButton>
            <IconButton
              aria-label="Rate"
              onClick={(event) => rateRank(event, value)}
            >
              <StarRateIcon />
            </IconButton>
          </CardActions>
        </Link>
      )}
    </Card>
  );
};
