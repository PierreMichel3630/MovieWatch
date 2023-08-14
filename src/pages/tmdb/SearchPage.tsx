import { Alert, Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { searchAll } from "src/api/tmdb/commun";
import { CardSearch } from "src/components/commun/CardSearch";
import { useQuery } from "src/utils/hook";
import { useNavigate } from "react-router-dom";
import { FixedBottomPagination } from "src/components/commun/Pagination";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { PersonSearchElement } from "src/models/tmdb/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";
import { useTranslation } from "react-i18next";
import { CardSearchSkeleton } from "src/components/commun/skeleton/Skeleton";

export const SearchPage = () => {
  const params = useQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { language } = useContext(UserContext);
  const query = params.has("query") ? (params.get("query") as string) : "";
  const page = params.has("page") ? Number(params.get("page")) : 1;
  const [isLoading, setIsLoading] = useState(true);
  const [isNoResult, setIsNoResult] = useState(false);

  const [results, setResults] = useState<
    Array<MovieSearchElement | PersonSearchElement | TvSearchElement>
  >([]);
  const [totalPage, setTotalPage] = useState<undefined | number>(undefined);
  const [totalResult, setTotalResult] = useState<number>(0);

  const search = () => {
    searchAll(query, language.language, page).then((res) => {
      setTotalPage(res.total_pages);
      setResults([...res.results]);
      setIsLoading(false);
      setIsNoResult(res.total_results === 0);
      setTotalResult(res.total_results);
    });
  };

  const changePage = (value: number) => {
    navigate({
      pathname: "/search",
      search: `?query=${query}&page=${value}`,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    search();
  }, [query, language, page]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} columns={20}>
        {isNoResult ? (
          <Grid item xs={20}>
            <Alert severity="warning">{t("commun.noresult")}</Alert>
          </Grid>
        ) : (
          <>
            {totalPage !== undefined && (
              <FixedBottomPagination
                page={page}
                totalPage={totalPage}
                onChange={changePage}
                totalResult={totalResult}
              />
            )}
            {isLoading ? (
              Array.from(new Array(20)).map((el) => (
                <Grid key={el} item xs={10} sm={5} md={5} lg={4} xl={4}>
                  <CardSearchSkeleton />
                </Grid>
              ))
            ) : (
              <>
                {results.map((el) => (
                  <Grid key={el.id} item xs={10} sm={5} md={5} lg={4} xl={4}>
                    <CardSearch value={el} />
                  </Grid>
                ))}
              </>
            )}
          </>
        )}
      </Grid>
    </Container>
  );
};
