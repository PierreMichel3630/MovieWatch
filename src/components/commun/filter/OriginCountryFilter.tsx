import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Filter } from "src/models/tmdb/commun/Filter";
import { Language } from "src/models/Language";
import {
  CN,
  CZ,
  DE,
  ES,
  FR,
  GB,
  IN,
  IT,
  JP,
  KR,
  PT,
  RU,
  SE,
  TR,
} from "country-flag-icons/react/1x1";
import { ChipLanguage } from "../Chip";

export const LANGUAGESORIGIN: Array<Language> = [
  {
    id: "en-GB",
    name: "English",
    flag: <GB title="English UK" />,
    language: "en",
  },
  {
    id: "fr-FR",
    name: "Français",
    flag: <FR title="France" />,
    language: "fr",
  },
  {
    id: "es-ES",
    name: "Español",
    flag: <ES title="Español" />,
    language: "es",
  },
  {
    id: "de-DE",
    name: "Deutsch",
    flag: <DE title="Deutsch" />,
    language: "de",
  },
  {
    id: "ja-JP",
    name: "Japanese",
    flag: <JP title="Japanese" />,
    language: "jp",
  },
  {
    id: "pt-PT",
    name: "Portuguese",
    flag: <PT title="Portuguese " />,
    language: "pt",
  },
  {
    id: "zh-CN",
    name: "Chinese",
    flag: <CN title="Chinese " />,
    language: "zh",
  },
  {
    id: "it-IT",
    name: "Italian",
    flag: <IT title="Italian " />,
    language: "it",
  },
  {
    id: "ru-RU",
    name: "Russian",
    flag: <RU title="Russian" />,
    language: "ru",
  },
  {
    id: "ko-KR",
    name: "Korean",
    flag: <KR title="Korean" />,
    language: "ko",
  },
  {
    id: "hi-IN",
    name: "India",
    flag: <IN title="India" />,
    language: "hi",
  },
  {
    id: "sv-SE",
    name: "Swedish",
    flag: <SE title="Swedish" />,
    language: "sv",
  },
  {
    id: "cs-CZ",
    name: "Czech",
    flag: <CZ title="Czech" />,
    language: "cs",
  },
  {
    id: "tr-TR",
    name: "Turkish",
    flag: <TR title="Turkish" />,
    language: "tr",
  },
];

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
}
export const OriginCountryFilter = ({ filter, onChange }: Props) => {
  const { t } = useTranslation();

  const languagesSelect = filter.origincountry;

  const selectLanguage = (value: Language) => {
    let newValue: Array<string> = [...languagesSelect];
    if (newValue.includes(value.language)) {
      newValue = newValue.filter((el) => el !== value.language);
    } else {
      newValue.push(value.language);
    }
    let newFilter: Filter = { ...filter, origincountry: newValue };
    onChange(newFilter);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h2">{t("commun.origincountry")}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {LANGUAGESORIGIN.map((language) => (
            <Grid item key={language.id}>
              <ChipLanguage
                language={language}
                active={languagesSelect.includes(language.language)}
                onClick={() => selectLanguage(language)}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
