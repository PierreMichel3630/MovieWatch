import { AppBar, Box, InputBase, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";

import { Colors } from "src/style/Colors";
import { AccountMenu } from "./AccountMenu";
import { NotificationsMenu } from "./NotificationsMenu";
import { LanguagesMenu } from "./LanguageMenu";
import { ModeMenu } from "./ModeMenu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ fill: Colors.grey }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <ModeMenu />
            <LanguagesMenu />
            <NotificationsMenu />
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
