import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import afAF from "./locales/af-AF.json";
import azAZ from "./locales/az-AZ.json";
import bsBS from "./locales/bs-BS.json";
import csCS from "./locales/cs-CS.json";
import daDA from "./locales/da-DA.json";
import deDE from "./locales/de-DE.json";
import enGB from "./locales/en-GB.json";
import esES from "./locales/es-ES.json";
import frFR from "./locales/fr-FR.json";
import hiHI from "./locales/hi-HI.json";
import hyHY from "./locales/hy-HY.json";
import idID from "./locales/id-ID.json";
import itIT from "./locales/it-IT.json";
import koKO from "./locales/ko-KO.json";
import mnMN from "./locales/mn-MN.json";
import nlNL from "./locales/nl-NL.json";
import plPL from "./locales/pl-PL.json";
import ptPT from "./locales/pt-PT.json";
import ruRU from "./locales/ru-RU.json";
import svSV from "./locales/sv-SV.json";
import trTR from "./locales/tr-TR.json";
import zhZH from "./locales/zh-ZH.json";
import skSK from "./locales/sk-SK.json";
import slSL from "./locales/sl-SL.json";
import viVI from "./locales/vi-VI.json";
import srSR from "./locales/sr-SR.json";
import ukUK from "./locales/uk-UK.json";
import bgBG from "./locales/bg-BG.json";
import arAR from "./locales/ar-AR.json";
import jaJA from "./locales/ja-JA.json";
import kaKA from "./locales/ka-KA.json";

const defaultLanguage = "en";

export const defaultNamespace = "default";

export const resources = {
  sk: {
    [defaultNamespace]: skSK,
  },
  sl: {
    [defaultNamespace]: slSL,
  },
  vi: {
    [defaultNamespace]: viVI,
  },
  sr: {
    [defaultNamespace]: srSR,
  },
  uk: {
    [defaultNamespace]: ukUK,
  },
  bg: {
    [defaultNamespace]: bgBG,
  },
  ar: {
    [defaultNamespace]: arAR,
  },
  ja: {
    [defaultNamespace]: jaJA,
  },
  ka: {
    [defaultNamespace]: kaKA,
  },
  af: {
    [defaultNamespace]: afAF,
  },
  hy: {
    [defaultNamespace]: hyHY,
  },
  mn: {
    [defaultNamespace]: mnMN,
  },
  az: {
    [defaultNamespace]: azAZ,
  },
  id: {
    [defaultNamespace]: idID,
  },
  bs: {
    [defaultNamespace]: bsBS,
  },
  da: {
    [defaultNamespace]: daDA,
  },
  en: {
    [defaultNamespace]: enGB,
  },
  fr: {
    [defaultNamespace]: frFR,
  },
  es: {
    [defaultNamespace]: esES,
  },
  de: {
    [defaultNamespace]: deDE,
  },
  it: {
    [defaultNamespace]: itIT,
  },
  nl: {
    [defaultNamespace]: nlNL,
  },
  pl: {
    [defaultNamespace]: plPL,
  },
  pt: {
    [defaultNamespace]: ptPT,
  },
  ru: {
    [defaultNamespace]: ruRU,
  },
  tr: {
    [defaultNamespace]: trTR,
  },
  sv: {
    [defaultNamespace]: svSV,
  },
  cs: {
    [defaultNamespace]: csCS,
  },
  hi: {
    [defaultNamespace]: hiHI,
  },
  ko: {
    [defaultNamespace]: koKO,
  },
  zh: {
    [defaultNamespace]: zhZH,
  },
};

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: [defaultNamespace],
  resources,
  lng: defaultLanguage,
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});
