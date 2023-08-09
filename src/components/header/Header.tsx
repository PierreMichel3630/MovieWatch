import { useContext } from "react";

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { AccountMenu } from "./AccountMenu";
import { NotificationsMenu } from "./NotificationsMenu";
import { LanguagesMenu } from "./LanguageMenu";
import { ModeMenu } from "./ModeMenu";
import { UserContext } from "src/App";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "src/pages/Home";
import { SearchInput } from "../commun/Input";

import MovieIcon from "@mui/icons-material/Movie";
import { viewWidth } from "csx";
import { Colors } from "src/style/Colors";

export const Header = () => {
  const { query, setQuery } = useContext(SearchContext);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const DEFAULTPAGE = 1;

  const submitSearch = () => {
    navigate({
      pathname: "/search",
      search: `?query=${query}&page=${DEFAULTPAGE}`,
    });
    setQuery("");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <MovieIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                marginRight: viewWidth(10),
              }}
            >
              <SearchInput
                onChange={(value) => setQuery(value)}
                submit={submitSearch}
                value={query}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <ModeMenu />
            <LanguagesMenu />
            <NotificationsMenu />
            {user ? (
              <AccountMenu user={user} />
            ) : (
              <>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Button
                    variant="outlined"
                    startIcon={<AccountCircleIcon />}
                    onClick={() => navigate("login")}
                  >
                    <Typography variant="body1">{t("header.login")}</Typography>
                  </Button>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    aria-label="connection"
                    color="inherit"
                    onClick={() => navigate("login")}
                  >
                    <AccountCircleIcon
                      sx={{ fill: Colors.blue, width: 30, height: 30 }}
                    />
                  </IconButton>
                </Box>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: { xs: "flex", md: "none" }, marginBottom: 1 }}>
        <SearchInput
          onChange={(value) => setQuery(value)}
          submit={submitSearch}
          value={query}
        />
      </Box>
    </Box>
  );
};
