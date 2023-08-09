import {
  Card,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "src/components/authentification/LoginForm";
import { style } from "typestyle";

const cardCss = style({
  padding: 16,
});
export const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", minHeight: "100vh" }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Card variant="outlined" className={cardCss}>
            <Grid container gap={1} sx={{ textAlign: "center" }}>
              <Grid item xs={12}>
                <Typography variant="h3">{t("pages.login.hi")}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" color="secondary">
                  {t("pages.login.credential")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoginForm />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body1"
                  onClick={() => navigate("register")}
                >
                  Don&apos;t have an account?
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
