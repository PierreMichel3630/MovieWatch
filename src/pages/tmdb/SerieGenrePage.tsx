import { Container, Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "src/App";
import { CardSearch } from "src/components/commun/CardSearch";
import { useQuery } from "src/utils/hook";
import { Loading } from "src/components/commun/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { FixedBottomPagination } from "src/components/commun/Pagination";
import { getTvByGenre } from "src/api/tmdb/tv";
import { MovieSearchElement } from "src/models/tmdb/movie/MovieSearchElement";
import { MediaType } from "src/models/tmdb/enum";
import { PersonSearchElement } from "src/models/tmdb/person/PersonSearchElement";
import { TvSearchElement } from "src/models/tmdb/tv/TvSearchElement";

export const SerieGenrePage = () => {
  let { id } = useParams();
  const params = useQuery();
  const navigate = useNavigate();

  const { language } = useContext(UserContext);
  const page = params.has("page") ? Number(params.get("page")) : 1;
  const [isLoading, setIsLoading] = useState(true);

  const [results, setResults] = useState<
    Array<MovieSearchElement | PersonSearchElement | TvSearchElement>
  >([]);
  const [totalPage, setTotalPage] = useState<undefined | number>(undefined);

  const search = () => {
    getTvByGenre([Number(id)], page, language.language).then((res) => {
      setTotalPage(res.total_pages);
      setResults([
        ...res.results.map((el) => ({ ...el, media_type: MediaType.tv })),
      ]);
      setIsLoading(false);
    });
  };

  const changePage = (value: number) => {
    navigate({
      pathname: `/genre/${id}/series`,
      search: `?page=${value}`,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    search();
  }, [id, language, page]);

  return (
    <Container maxWidth="lg">
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
    </Container>
  );
};
