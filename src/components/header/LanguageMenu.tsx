import { useContext, useState } from "react";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { DE, ES, FR, GB, US } from "country-flag-icons/react/1x1";
import { percent } from "csx";

import { Language } from "src/models/Language";
import { style } from "typestyle";
import { LanguageContext } from "src/App";

const divFlagCss = style({
  width: 24,
  height: 24,
  borderRadius: percent(50),
  overflow: "hidden",
});

const flagCss = style({
  width: 24,
  height: 24,
});

export const LanguagesMenu = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const languages: Array<Language> = [
    {
      id: "en-GB",
      name: "English",
      flag: <GB title="English UK" />,
    },
    {
      id: "fr-FR",
      name: "Français",
      flag: <FR title="France" />,
    },
    {
      id: "es-ES",
      name: "Español",
      flag: <ES title="Español" />,
    },
    {
      id: "de-DE",
      name: "Deutsch",
      flag: <DE title="Deutsch" />,
    },
  ];

  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const selectLanguage = (language: Language) => {
    setLanguage(language);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton
        aria-label="language"
        color="inherit"
        onClick={handleOpenMenu}
      >
        <div className={divFlagCss}>{language.flag}</div>
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchor)}
        onClose={handleCloseMenu}
      >
        {languages.map((language) => (
          <MenuItem key={language.id} onClick={() => selectLanguage(language)}>
            <ListItemIcon>
              <div className={flagCss}>{language.flag}</div>
            </ListItemIcon>
            <ListItemText>{language.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
