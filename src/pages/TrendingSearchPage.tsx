import { Alert, Chip, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { getTrending } from "src/api/commun";
import { getMovieTrending } from "src/api/movie";
import { getPersonTrending } from "src/api/person";
import { getTvTrending } from "src/api/tv";
import { CardSearch } from "src/components/commun/CardSearch";
import { useQuery } from "src/utils/hook";
import { useNavigate } from "react-router-dom";
import { FixedBottomPagination } from "src/components/commun/Pagination";
import { useTranslation } from "react-i18next";
import { style } from "typestyle";
import { MediaType } from "src/models/enum";
import { MovieSearchElement } from "src/models/movie/MovieSearchElement";
import { PersonSearchElement } from "src/models/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tv/TvSearchElement";
import { CardSearchSkeleton } from "src/components/commun/skeleton/Skeleton";
import { Helmet } from "react-helmet-async";

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
  const [isNoResult, setIsNoResult] = useState(false);

  useEffect(() => {
    document.title = `${t("pages.trendingsearch.title")} - MovieSerieSearch`;
  }, []);

  const search = () => {
    if (type === MediaType.tv) {
      getTvTrending(page, language.iso_639_1).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
        setIsNoResult(res.total_results === 0);
      });
    } else if (type === MediaType.movie) {
      getMovieTrending(page, language.iso_639_1).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
        setIsNoResult(res.total_results === 0);
      });
    } else if (type === MediaType.person) {
      getPersonTrending(page, language.iso_639_1).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
        setIsNoResult(res.total_results === 0);
      });
    } else {
      getTrending(page, language.iso_639_1).then((res) => {
        setTotalPage(res.total_pages);
        setResults([...res.results]);
        setIsLoading(false);
        setIsNoResult(res.total_results === 0);
      });
    }
  };

  const changePage = (value: number) => {
    navigate({
      pathname: `/trendingsearch`,
      search: `?page=${value}${type ? `&type=${type}` : ""}`,
    });
  };

  const selectFilter = (value?: MediaType) => {
    navigate({
      pathname: `/trendingsearch`,
      search: `?page=1${value ? `&type=${value}` : ""}`,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    search();
  }, [type, language, page]);

  return (
    <Container maxWidth="lg">
      <Helmet>
        <title>{`${t("pages.trendingsearch.title")} - MovieSerieSearch`}</title>
      </Helmet>
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
            label={t("commun.persons")}
            variant={type && type === MediaType.person ? "filled" : "outlined"}
            onClick={() => selectFilter(MediaType.person)}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1} columns={12}>
            {isNoResult ? (
              <Grid item xs={12}>
                <Alert severity="warning">{t("commun.noresult")}</Alert>
              </Grid>
            ) : (
              <>
                {totalPage !== undefined && (
                  <FixedBottomPagination
                    page={page}
                    totalPage={totalPage}
                    onChange={changePage}
                  />
                )}
                {isLoading ? (
                  Array.from(new Array(20)).map((_, index) => (
                    <Grid key={index} item xs={6} sm={4} md={3} lg={3} xl={3}>
                      <CardSearchSkeleton />
                    </Grid>
                  ))
                ) : (
                  <>
                    {results.map((el) => (
                      <Grid key={el.id} item xs={6} sm={4} md={3} lg={3} xl={3}>
                        <CardSearch value={el} />
                      </Grid>
                    ))}
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
