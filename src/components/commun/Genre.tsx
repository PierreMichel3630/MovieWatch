import { useContext } from "react";
import { SearchContext } from "src/pages/Home";

export const getListGenre = (listId: Array<number>) => {
  const { genres } = useContext(SearchContext);

  return (
    <>
      {genres
        .filter((genre) => listId.includes(genre.id))
        .map((genre) => genre.name)
        .filter((v, i, a) => a.indexOf(v) == i)
        .join(", ")}
    </>
  );
};
