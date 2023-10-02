import {
  Avatar,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import { percent, px } from "csx";
import { useTranslation } from "react-i18next";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { PersonSearchElement } from "src/models/person/PersonSearchElement";
import { Colors } from "src/style/Colors";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "src/App";
import { Country } from "src/models/Country";

interface PropsSearchInput {
  value: string;
  onChange: (value: string) => void;
  submit: () => void;
  clear: () => void;
}

export const SearchInput = ({
  value,
  clear,
  onChange,
  submit,
}: PropsSearchInput) => {
  const { t } = useTranslation();

  return (
    <Paper
      component="form"
      variant="outlined"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: percent(100),
      }}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t("header.search.input")}
        inputProps={{ "aria-label": t("header.search.input") }}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value !== "" && (
        <IconButton
          type="button"
          sx={{ p: "2px" }}
          aria-label="clear"
          onClick={() => clear()}
        >
          <ClearIcon sx={{ width: 15, height: 15 }} />
        </IconButton>
      )}
      <IconButton
        type="button"
        sx={{ p: "2px" }}
        aria-label="search"
        onClick={() => submit()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

interface PropsBasicSearchInput {
  label: string;
  value: string;
  onChange: (value: string) => void;
  clear: () => void;
}

export const BasicSearchInput = ({
  label,
  value,
  clear,
  onChange,
}: PropsBasicSearchInput) => (
  <Paper
    variant="outlined"
    sx={{
      p: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: percent(100),
    }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder={label}
      inputProps={{ "aria-label": label }}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
    {value !== "" && (
      <IconButton
        type="button"
        size="small"
        aria-label="clear"
        onClick={() => clear()}
      >
        <ClearIcon sx={{ width: 15, height: 15 }} />
      </IconButton>
    )}
  </Paper>
);

interface PropsAutocompleteInput {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clear: () => void;
  onSelect: (value: PersonSearchElement) => void;
  results: Array<PersonSearchElement>;
}

export const AutocompleteInputPerson = ({
  placeholder,
  value,
  clear,
  onChange,
  onSelect,
  results,
}: PropsAutocompleteInput) => {
  const { mode } = useContext(UserContext);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const unFocus = () => setFocused(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        unFocus();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Paper
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: percent(100),
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": placeholder }}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
        />
        {value !== "" && (
          <IconButton
            type="button"
            size="small"
            aria-label="clear"
            onClick={() => clear()}
          >
            <ClearIcon sx={{ width: 15, height: 15 }} />
          </IconButton>
        )}
      </Paper>
      {results.length > 0 && focused && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            width: percent(100),
            zIndex: 2,
            flexDirection: "column",
            position: "absolute",
            maxHeight: px(200),
            overflow: "scroll",
          }}
        >
          {results.slice(0, 5).map((el) => (
            <Grid
              container
              sx={{
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  color:
                    mode === "dark" ? Colors.lightgrey : Colors.greyDarkMode,
                  backgroundColor:
                    mode === "dark" ? Colors.greyDarkMode : Colors.lightgrey,
                },
              }}
              alignItems="center"
              onClick={() => {
                onSelect(el);
                unFocus();
              }}
              key={el.id}
            >
              <Grid item xs={3}>
                {el.profile_path && el.profile_path !== "" ? (
                  <Avatar
                    alt={el.name}
                    src={`https://image.tmdb.org/t/p/w45${el.profile_path}`}
                  />
                ) : (
                  <Avatar alt={el.name}>{el.name.charAt(0)}</Avatar>
                )}
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{el.name}</Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
    </div>
  );
};

interface PropsAutocompleteInputCountries {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clear: () => void;
  onSelect: (value: Country) => void;
  results: Array<Country>;
}
export const AutocompleteInputCountries = ({
  placeholder,
  value,
  clear,
  onChange,
  onSelect,
  results,
}: PropsAutocompleteInputCountries) => {
  const { mode } = useContext(UserContext);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const unFocus = () => setFocused(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        unFocus();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div style={{ position: "relative" }} ref={ref}>
      <Paper
        variant="outlined"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: percent(100),
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          inputProps={{ "aria-label": placeholder }}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={onFocus}
        />
        {value !== "" && (
          <IconButton
            type="button"
            size="small"
            aria-label="clear"
            onClick={() => clear()}
          >
            <ClearIcon sx={{ width: 15, height: 15 }} />
          </IconButton>
        )}
      </Paper>
      {results.length > 0 && focused && (
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            width: percent(100),
            zIndex: 2,
            flexDirection: "column",
            position: "absolute",
            maxHeight: px(200),
            overflow: "scroll",
          }}
        >
          {results.map((el) => (
            <Grid
              container
              sx={{
                cursor: "pointer",
                p: 1,
                "&:hover": {
                  color:
                    mode === "dark" ? Colors.lightgrey : Colors.greyDarkMode,
                  backgroundColor:
                    mode === "dark" ? Colors.greyDarkMode : Colors.lightgrey,
                },
              }}
              alignItems="center"
              onClick={() => {
                onSelect(el);
                unFocus();
              }}
              key={el.iso_3166_1}
            >
              <Grid item xs={3}>
                <Avatar
                  src={`https://flagicons.lipis.dev/flags/1x1/${el.iso_3166_1.toLowerCase()}.svg`}
                />
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1">{el.native_name}</Typography>
              </Grid>
            </Grid>
          ))}
        </Paper>
      )}
    </div>
  );
};
