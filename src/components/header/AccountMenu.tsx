import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { style } from "typestyle";
import { User } from "src/models/User";
import { AccountBadge } from "../commun/AccountBadge";

import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";
import { UserContext } from "src/App";

const divCss = style({
  display: "flex",
  padding: 16,
  alignItems: "center",
});

interface Props {
  user: User;
}

export const AccountMenu = ({ user }: Props) => {
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const settings = [
    t("header.account.profile"),
    t("header.account.parameters"),
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setUser(undefined);
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AccountBadge user={user} onClick={handleOpenUserMenu} />
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <div className={divCss}>
          <Avatar
            alt="Avatar"
            src={user.picture ? user.picture : "/src/assets/man-avatar.svg"}
            sx={{ width: 35, height: 35, mr: 2 }}
          />
          <div>
            <Typography variant="h6">
              {user.given_name} {user.family_name}
            </Typography>
            <Typography component="small" variant="caption" color="secondary">
              {user.email}
            </Typography>
          </div>
        </div>
        <Divider />
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <ListItemText>{setting}</ListItemText>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("header.account.logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
