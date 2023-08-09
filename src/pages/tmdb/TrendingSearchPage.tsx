import { Chip, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { getTrending } from "src/api/tmdb/commun";
import { getMovieTrending } from "src/api/tmdb/movie";
import { getPersonTrending } from "src/api/tmdb/person";
import { getTvTrending } from "src/api/tmdb/tv";
import { CardSearch } from "src/components/commun/CardSearch";
import { useQuery } from "src/utils/hook";
import { Loading } from "src/components/commun/Loading";
import { useNavigate } from "react-router-dom";
import { FixedBottomPagination } from "src/components/commun/Pagination";
import { useTranslation } from "react-i18next";
import { style } from "typestyle";
import { MediaType } from "src/models/tmdb/enum";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { PersonSearchElement } from "src/models/tmdb/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";

const divFilterCss = style({
  marginLeft: 15,
  display: "flex",
  gap: 10,
  justifyContent: "center",
});

export const TrendingSearchPage = () => {
  const params = useQuery();
  const navigate = useNavigate();

  const { language } = useContext(UserContext);
  const { t } = useTranslation();

  const page = params.has("page") ? Number(params.get("page")) : 1;
  const type = params.has("type")
    ? (params.get("type") as MediaType)
    : undefined;
  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState<
    Array<MovieSearchElement | PersonSearchElement | TvSearchElement>
  >([]);
  const [totalPage, setTotalPage] = useState<undefined | number>(undefined);

  const search = () => {
    if (type === MediaType.tv) {
      getTvTrending(page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
      });
    } else if (type === MediaType.movie) {
      getMovieTrending(page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
      });
    } else if (type === MediaType.person) {
      getPersonTrending(page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
      });
    } else {
      getTrending(page, language.language).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
      });
    }
  };

  const changePage = (value: number) => {
    navigate({
      pathname: `/trending`,
      search: `?page=${value}${type ? `&type=${type}` : ""}`,
    });
  };

  const selectFilter = (value?: MediaType) => {
    navigate({
      pathname: `/trending`,
      search: `?page=1${value ? `&type=${value}` : ""}`,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    search();
  }, [type, language, page]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} className={divFilterCss}>
          <Chip
            label={t("commun.all")}
            variant={type === undefined ? "filled" : "outlined"}
            onClick={() => selectFilter(undefined)}
          />
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
          <Chip
            label={t("commun.person")}
            variant={type && type === MediaType.person ? "filled" : "outlined"}
            onClick={() => selectFilter(MediaType.person)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} columns={20}>
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
