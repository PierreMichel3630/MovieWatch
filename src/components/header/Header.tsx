import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { important, px } from "csx";
import { Link, useNavigate } from "react-router-dom";

import { LanguagesMenu } from "./LanguageMenu";
import { ModeMenu } from "./ModeMenu";

import MovieIcon from "@mui/icons-material/Movie";
import { SearchInput } from "../commun/Input";
import { useContext } from "react";
import { SearchContext } from "src/pages/HomePage";
import { AppsMenu } from "./AppsMenu";

export const Header = () => {
  const DEFAULTPAGE = 1;
  const navigate = useNavigate();
  const { query, setQuery, type } = useContext(SearchContext);

  const submitSearch = () => {
    navigate({
      pathname: `/search`,
      search: `?query=${query}&page=${DEFAULTPAGE}${
        type ? `&type=${type}` : ""
      }`,
    });
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar id="toolbar" sx={{ p: important(px(0)), gap: px(8) }}>
          <Link to="/">
            <IconButton>
              <MovieIcon fontSize="large" />
            </IconButton>
          </Link>
          <SearchInput
            onChange={(value) => setQuery(value)}
            submit={submitSearch}
            value={query}
            clear={clearSearch}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ModeMenu />
            <LanguagesMenu />
            <AppsMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
