import { Chip, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { getMovieByGenre } from "src/api/tmdb/movie";
import { CardSearch } from "src/components/commun/CardSearch";
import { useQuery } from "src/utils/hook";
import { Loading } from "src/components/commun/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { FixedBottomPagination } from "src/components/commun/Pagination";
import { style } from "typestyle";
import { useTranslation } from "react-i18next";
import { SearchContext } from "../Home";
import { getTvByGenre } from "src/api/tmdb/tv";
import { MediaType } from "src/models/tmdb/enum";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { PersonSearchElement } from "src/models/tmdb/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";
import { Genre } from "src/models/tmdb/commun/Genre";

const divFilterCss = style({
  marginLeft: 15,
  display: "flex",
  gap: 10,
  justifyContent: "center",
});

export const MovieGenrePage = () => {
  const params = useQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { genres } = useContext(SearchContext);
  const { language } = useContext(UserContext);

  const page = params.has("page") ? Number(params.get("page")) : 1;
  const type = params.has("type")
    ? (params.get("type") as MediaType)
    : MediaType.movie;

  const genresParams = params.get("genres");
  const genresSelect =
    params.has("genres") && genresParams !== null
      ? genresParams.split(",").map((el) => Number(el))
      : [];
  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState<
    Array<MovieSearchElement | PersonSearchElement | TvSearchElement>
  >([]);
  const [totalPage, setTotalPage] = useState<undefined | number>(undefined);

  const search = () => {
    if (type === MediaType.tv) {
      getTvByGenre(genresSelect, page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([
          ...res.results.map((el) => ({ ...el, media_type: MediaType.movie })),
        ]);
        setIsLoading(false);
      });
    } else {
      getMovieByGenre(genresSelect, page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([
          ...res.results.map((el) => ({ ...el, media_type: MediaType.movie })),
        ]);
        setIsLoading(false);
      });
    }
  };

  const changePage = (value: number) => {
    navigate({
      pathname: `/genres`,
      search: `?page=${value}&type=${type}${
        genresSelect.length > 0 ? `&genres=${genresSelect.join(",")}` : ""
      }`,
    });
  };

  const selectFilter = (value: MediaType) => {
    navigate({
      pathname: `/genres`,
      search: `?page=1&type=${value}`,
    });
  };

  const selectGenre = (value?: Genre) => {
    let newGenres: Array<number> = [];
    if (value) {
      newGenres = [...genresSelect];
      if (newGenres.includes(value.id)) {
        newGenres = newGenres.filter((el) => el !== value.id);
      } else {
        newGenres.push(value.id);
      }
    }
    const newGenreToString =
      newGenres.length > 0 ? `&genres=${newGenres.join(",")}` : "";
    navigate({
      pathname: `/genres`,
      search: `?page=1&type=${type}${newGenreToString}`,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    search();
  }, [genresParams, type, language, page]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} className={divFilterCss}>
          <Chip
            label={t("commun.movies")}
            variant={type && type === MediaType.movie ? "filled" : "outlined"}
            onClick={() => selectFilter(MediaType.movie)}
          />
          <Chip
            label={t("commun.series")}
            variant={type && type === MediaType.tv ? "filled" : "outlined"}
            onClick={() => selectFilter(MediaType.tv)}
          />
        </Grid>
        <Grid item xs={12} className={divFilterCss}>
          <Grid container spacing={1}>
            <Grid item>
              <Chip
                label={t("commun.all")}
                variant={genresSelect.length > 0 ? "outlined" : "filled"}
                onClick={() => selectGenre(undefined)}
              />
            </Grid>
            {genres
              .filter((el) => el.type === type)
              .map((genre) => (
                <Grid item key={genre.id}>
                  <Chip
                    label={genre.name}
                    variant={
                      genresSelect.includes(genre.id) ? "filled" : "outlined"
                    }
                    onClick={() => selectGenre(genre)}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} columns={20}>
            {totalPage !== undefined && (
              <FixedBottomPagination
                page={page}
                totalPage={totalPage}
                onChange={changePage}
              />
            )}
            {isLoading ? (
              <Grid item xs={20} sx={{ minHeight: "75vh" }}>
                <Loading />
              </Grid>
            ) : (
              results.map((el) => (
                <Grid item key={el.id} xs={10} sm={5} md={5} lg={4} xl={4}>
                  <CardSearch value={el} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
