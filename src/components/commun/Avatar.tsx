import { Avatar } from "@mui/material";
import {
  AM,
  AZ,
  BG,
  BS,
  CN,
  CZ,
  DE,
  DK,
  ES,
  FR,
  GA,
  GB,
  ID,
  IN,
  IT,
  JP,
  KR,
  MN,
  NL,
  PL,
  PT,
  RU,
  SE,
  SK,
  SL,
  SR,
  TR,
  UA,
  VI,
} from "country-flag-icons/react/1x1";

interface PropsAvatarLanguage {
  iso: string;
}
export const AvatarLanguage = ({ iso }: PropsAvatarLanguage) => {
  const getValue = () => {
    let res: any = iso;
    switch (iso) {
      case "hy":
        res = <AM title="Armenian" />;
        break;
      case "mn":
        res = <MN title="Mongolian" />;
        break;
      case "az":
        res = <AZ title="Azərbaycan" />;
        break;
      case "id":
        res = <ID title="Bahasa indonesia" />;
        break;
      case "bs":
        res = <BS title="Bosanski" />;
        break;
      case "da":
        res = <DK title="Dansk" />;
        break;
      case "bg":
        res = <BG title="български език" />;
        break;
      case "ka":
        res = <GA title="ქართული" />;
        break;
      case "ja":
        res = <JP title="日本語" />;
        break;
      case "uk":
        res = <UA title="Український" />;
        break;
      case "sr":
        res = <SR title="Srpski" />;
        break;
      case "vi":
        res = <VI title="Tiếng Việt" />;
        break;
      case "sl":
        res = <SL title="Slovenščina" />;
        break;
      case "sk":
        res = <SK title="Slovenčina" />;
        break;
      case "en":
        res = <GB title="English UK" />;
        break;
      case "fr":
        res = <FR title="France" />;
        break;
      case "es":
        res = <ES title="Español" />;
        break;
      case "de":
        res = <DE title="Deutsch" />;
        break;
      case "jp":
        res = <JP title="Japanese" />;
        break;
      case "pt":
        res = <PT title="Portuguese " />;
        break;
      case "zh":
        res = <CN title="Chinese " />;
        break;
      case "it":
        res = <IT title="Italian " />;
        break;
      case "ru":
        res = <RU title="Russian" />;
        break;
      case "ko":
        res = <KR title="Korean" />;
        break;
      case "hi":
        res = <IN title="India" />;
        break;
      case "sv":
        res = <SE title="Swedish" />;
        break;
      case "cs":
        res = <CZ title="Czech" />;
        break;
      case "tr":
        res = <TR title="Turkish" />;
        break;
      case "pl":
        res = <PL title="Polski" />;
        break;
      case "nl":
        res = <NL title="Nederlands" />;
        break;
    }

    return res;
  };
  return <Avatar sx={{ width: 30, height: 30 }}>{getValue()}</Avatar>;
};

interface PropsUsernameAvatar {
  img: null | string;
  username: string;
}

export const UsernameAvatar = ({ img, username }: PropsUsernameAvatar) => {
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name: string) => ({
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.charAt(0).toUpperCase()}`,
  });

  return img !== null ? (
    <Avatar src={img} />
  ) : (
    <Avatar {...stringAvatar(username)} />
  );
};
