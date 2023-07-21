import { createContext, useEffect, useMemo, useState } from "react";
import i18next from "i18next";
import {
  Container,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { Header } from "./components/header/Header";
import { Colors } from "./style/Colors";
import { Language } from "./models/Language";

import { FR } from "country-flag-icons/react/1x1";

import "./App.css";
import "./i18n/config";

// Mode Light/Dark
export const ModeContext = createContext({
  mode: "light",
  setMode: (mode: "light" | "dark") => {},
});

// Language
const DEFAULT_LANGUAGE: Language = {
  id: "FR",
  name: "Français",
  flag: <FR title="France" />,
};
export const LanguageContext = createContext({
  language: DEFAULT_LANGUAGE,
  setLanguage: (language: Language) => {},
});

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    changeLanguage(language.id);
  }, [language]);

  const changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

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
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <Grid container>
              <Grid item xs={12}>
                <Header />
              </Grid>
              <Grid item xs={12}>
                <Typography>{language.name}</Typography>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </ModeContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
