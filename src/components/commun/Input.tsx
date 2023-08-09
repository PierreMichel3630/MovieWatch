import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";
import { percent, px } from "csx";
import { useTranslation } from "react-i18next";

interface PropsSearchInput {
  value: string;
  onChange: (value: string) => void;
  submit: () => void;
}

export const SearchInput = ({ value, onChange, submit }: PropsSearchInput) => {
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
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={() => submit()}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
