import { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import i18next from "i18next";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { Colors } from "./style/Colors";
import { LANGUAGES, Language } from "./models/Language";
import { User } from "./models/User";

import { FR } from "country-flag-icons/react/1x1";

import "./App.css";
import "./i18n/config";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MoviePage } from "./pages/tmdb/MoviePage";
import { PersonPage } from "./pages/tmdb/PersonPage";
import { SearchPage } from "./pages/tmdb/SearchPage";
import { SeriePage } from "./pages/tmdb/SeriePage";
import { EpisodePage } from "./pages/tmdb/EpisodePage";
import { TrendingPage } from "./pages/tmdb/TrendingPage";
import { SerieGenrePage } from "./pages/tmdb/SerieGenrePage";
import { MovieGenrePage } from "./pages/tmdb/MovieGenrePage";
import { TrendingSearchPage } from "./pages/tmdb/TrendingSearchPage";

// Language
const DEFAULT_LANGUAGE: Language = {
  id: "fr-FR",
  name: "Français",
  flag: <FR title="France" />,
  language: "fr",
};

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
                  main: Colors.greyDarkMode,
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
          caption: {
            fontSize: 13,
            fontWeight: 500,
          },
          body1: {
            fontSize: 13,
            fontWeight: 500,
          },
          h1: {
            fontSize: 50,
            fontWeight: 700,
          },
          h2: {
            fontSize: 22,
            fontWeight: 700,
          },
          h3: {
            fontSize: 18,
            fontWeight: 700,
          },
          h4: {
            fontSize: 16,
            fontWeight: 700,
          },
          h6: {
            fontSize: 13,
            fontWeight: 600,
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
              <Route path="/genre/:id/movies" element={<MovieGenrePage />} />
              <Route path="/genre/:id/series" element={<SerieGenrePage />} />
              <Route path="/trending" element={<TrendingSearchPage />} />
              <Route path="/genres" element={<MovieGenrePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
