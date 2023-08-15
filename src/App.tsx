import "./App.css";
import "./i18n/config";
import moment from "moment";
import { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { Colors } from "./style/Colors";
import { DEFAULT_LANGUAGE, LANGUAGES, Language } from "./models/Language";
import { User } from "./models/User";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MoviePage } from "./pages/tmdb/MoviePage";
import { PersonPage } from "./pages/tmdb/PersonPage";
import { SearchPage } from "./pages/tmdb/SearchPage";
import { SeriePage } from "./pages/tmdb/SeriePage";
import { EpisodePage } from "./pages/tmdb/EpisodePage";
import { TrendingPage } from "./pages/tmdb/TrendingPage";
import { TrendingSearchPage } from "./pages/tmdb/TrendingSearchPage";
import { DiscoverPage } from "./pages/tmdb/DiscoverPage";

import "moment/dist/locale/fr";
import "moment/dist/locale/de";
import "moment/dist/locale/es";

export const UserContext = createContext<{
  user: undefined | User;
  language: Language;
  mode: "light" | "dark";
  setUser: (user: undefined | User) => void;
  setLanguage: (language: Language) => void;
  setMode: (mode: "light" | "dark") => void;
}>({
  user: undefined,
  language: DEFAULT_LANGUAGE,
  mode: "light",
  setUser: (user: undefined | User) => {},
  setLanguage: (language: Language) => {},
  setMode: (mode: "light" | "dark") => {},
});

function App() {
  const [user, setUser] = useState<undefined | User>(
    localStorage.getItem("user") !== null
      ? (JSON.parse(localStorage.getItem("user")!) as User)
      : undefined
  );

  const [mode, setMode] = useState<"light" | "dark">(
    localStorage.getItem("mode") !== null
      ? (localStorage.getItem("mode")! as "light" | "dark")
      : "dark"
  );

  const [language, setLanguage] = useState(
    localStorage.getItem("language") !== null
      ? LANGUAGES.find((el) => el.id === localStorage.getItem("language")!)!
      : DEFAULT_LANGUAGE
  );

  useEffect(() => {
    moment.locale(language.language);
    changeLanguage(language.id);
  }, [language]);

  const changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language.id);
    } else {
      localStorage.removeItem("language");
    }
  }, [language]);

  useEffect(() => {
    if (mode) {
      localStorage.setItem("mode", mode);
    } else {
      localStorage.removeItem("mode");
    }
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                secondary: {
                  main: Colors.greyLightMode,
                },
                text: {
                  primary: Colors.black,
                  secondary: Colors.grey2,
                },
                background: {
                  default: Colors.lightgrey,
                },
              }
            : {
                secondary: {
                  main: Colors.grey,
                },
                background: {
                  default: "#171c24",
                },
                text: {
                  primary: Colors.white,
                  secondary: Colors.grey2,
                },
              }),
        },
        typography: {
          fontFamily: ["Montserrat", "sans-serif"].join(","),
          h1: {
            fontSize: 50,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 30,
            },
          },
          caption: {
            fontSize: 13,
            fontWeight: 500,
            "@media (max-width:600px)": {
              fontSize: 12,
            },
          },
          body1: {
            fontSize: 13,
            fontWeight: 500,
            "@media (max-width:600px)": {
              fontSize: 12,
            },
          },
          body2: {
            fontSize: 11,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 11,
            },
          },
          h2: {
            fontSize: 22,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 20,
            },
          },
          h3: {
            fontSize: 18,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 15,
            },
          },
          h4: {
            fontSize: 16,
            fontWeight: 700,
            "@media (max-width:600px)": {
              fontSize: 14,
            },
          },
          h6: {
            fontSize: 13,
            fontWeight: 600,
            "@media (max-width:600px)": {
              fontSize: 12,
            },
          },
        },
      }),
    [mode]
  );

  return (
    <UserContext.Provider
      value={{ user, mode, language, setUser, setLanguage, setMode }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />}>
              <Route index path="/" element={<TrendingPage />} />
              <Route index path="/search" element={<SearchPage />} />
              <Route path="/movie/:id" element={<MoviePage />} />
              <Route path="/person/:id" element={<PersonPage />} />
              <Route path="/serie/:id" element={<SeriePage />} />
              <Route
                path="/serie/:id/season/:season/episode/:episode"
                element={<EpisodePage />}
              />
              <Route path="/trending" element={<TrendingSearchPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
