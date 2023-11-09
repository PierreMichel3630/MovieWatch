import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import i18next from "i18next";
import moment from "moment";
import { createContext, useEffect, useMemo, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./i18n/config";

import { Colors } from "./style/Colors";

import Routes from "./routes";

import "moment/dist/locale/de";
import "moment/dist/locale/es";
import "moment/dist/locale/fr";
import { getLanguages } from "./api/language";
import { resources } from "./i18n/config";
import { Language } from "./models/Language";
import { sortByName } from "./utils/sort";
import { Helmet } from "react-helmet-async";

const DEFAULT_LANGUAGE: Language = {
  iso_639_1: "en",
  english_name: "English",
  name: "English",
};

export const UserContext = createContext<{
  language: Language;
  languages: Array<Language>;
  mode: "light" | "dark";
  setLanguage: (language: Language) => void;
  setMode: (mode: "light" | "dark") => void;
}>({
  language:
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : DEFAULT_LANGUAGE,
  languages: [],
  mode: "light",
  setLanguage: (language: Language) => {},
  setMode: (mode: "light" | "dark") => {},
});

function App() {
  const [languages, setLanguages] = useState<Array<Language>>([]);

  const searchAllLanguage = async () => {
    getLanguages().then((res) => {
      const isoLanguageTranslate = Object.keys(resources);
      setLanguages(
        res
          .filter((el) => isoLanguageTranslate.includes(el.iso_639_1))
          .sort(sortByName)
      );
    });
  };

  useEffect(() => {
    searchAllLanguage();
  }, []);

  const getLanguage = () =>
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : DEFAULT_LANGUAGE;

  const [mode, setMode] = useState<"light" | "dark">(
    localStorage.getItem("mode") !== null
      ? (localStorage.getItem("mode")! as "light" | "dark")
      : "dark"
  );

  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    if (language) {
      moment.locale(language.iso_639_1);
      changeLanguage(language.iso_639_1);
      localStorage.setItem("language", JSON.stringify(language));
    }
  }, [language]);

  const changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

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
                  secondary: Colors.white,
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
      value={{ mode, languages, language, setLanguage, setMode }}
    >
      <Helmet
        htmlAttributes={{
          lang: language.iso_639_1,
        }}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
