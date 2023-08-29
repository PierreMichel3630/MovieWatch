import { Avatar, Typography } from "@mui/material";
import { BadgeAccountActive } from "./Badge";
import { border } from "csx";
import { Colors } from "src/style/Colors";
import { style } from "typestyle";
import { useTranslation } from "react-i18next";
import { User } from "@supabase/supabase-js";

const divCss = style({
  display: "flex",
  borderRadius: 30,
  border: border({ width: 1, style: "solid", color: Colors.grey3 }),
  padding: 5,
  alignItems: "center",
  cursor: "pointer",
  $nest: {
    "&:hover": {
      backgroundColor: Colors.lightgrey,
    },
  },
});

interface Props {
  user: User;
  onClick: (event: any) => void;
}
export const AccountBadge = ({ user, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <div onClick={onClick} className={divCss}>
      <Typography
        component="small"
        variant="caption"
        color="secondary"
        ml={1}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {t("header.account.hi")}
      </Typography>
      {/*<Typography
        component="small"
        variant="caption"
        sx={{ fontWeight: 700 }}
        ml={0.5}
        mr={1}
        color="secondary"
      >
        {user.given_name} {user.family_name}
  </Typography>*/}
      <BadgeAccountActive
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
        variant="dot"
      >
        <Avatar
          alt="Avatar"
          src="/src/assets/man-avatar.svg"
          sx={{ width: 28, height: 28 }}
        />
      </BadgeAccountActive>
    </div>
  );
};
