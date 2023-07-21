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
import { useState } from "react";
import { style } from "typestyle";
import { User } from "src/models/User";
import { AccountBadge } from "../commun/AccountBadge";

import LogoutIcon from "@mui/icons-material/Logout";
import { useTranslation } from "react-i18next";

const divCss = style({
  display: "flex",
  padding: 16,
  alignItems: "center",
});

export const AccountMenu = () => {
  const { t } = useTranslation();

  const user: User = {
    firstname: "Pierre",
    lastname: "Michel",
    email: "pierremichel804@gmail.com",
  };
  const settings = [t("header.account.profile"), t("header.account.logout")];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            src="/src/assets/man-avatar.svg"
            sx={{ width: 35, height: 35, mr: 2 }}
          />
          <div>
            <Typography variant="h6">
              {user.firstname} {user.lastname}
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
        <MenuItem onClick={handleCloseUserMenu}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t("header.account.logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
