import { DE, ES, FR, GB, US } from "country-flag-icons/react/1x1";

export interface Language {
  name: string;
  flag: JSX.Element;
  id: string;
  language: string;
}

export const LANGUAGES: Array<Language> = [
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
];
