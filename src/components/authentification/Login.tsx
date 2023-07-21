import { Card, Divider, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { LoginForm } from "./LoginForm";

export const Login = () => (
  <Card variant="outlined">
    <Grid container direction="column" justifyContent="flex-end">
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12}>
                <LoginForm />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  item
                  container
                  direction="column"
                  alignItems="center"
                  xs={12}
                >
                  <Typography
                    component={Link}
                    to="/pages/register/register3"
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    Don&apos;t have an account?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Card>
);
