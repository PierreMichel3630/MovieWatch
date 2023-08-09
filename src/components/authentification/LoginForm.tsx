import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import * as Yup from "yup";
import { Formik } from "formik";
import { border, padding } from "csx";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Google from "../../assets/social-google.svg";
import { style } from "typestyle";
import { useGoogleLogin } from "@react-oauth/google";
import { getProfile } from "src/api/authentification";
import { UserContext } from "src/App";
import { User } from "src/models/User";
import { useNavigate } from "react-router-dom";

const formCss = style({ display: "flex", flexDirection: "column", gap: 10 });

export const LoginForm = ({ ...others }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);

  const initialValue = {
    email: "",
    password: "",
    submit: null,
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
  });

  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getProfile(tokenResponse.access_token).then((res) => {
        setUser(res as User);
        navigate("/");
      });
    },
    onError: (error) => console.log(error),
  });

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <Button
            disableElevation
            fullWidth
            onClick={() => loginGoogle()}
            size="large"
            variant="outlined"
          >
            <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
              <img
                src={Google}
                alt="google"
                width={16}
                height={16}
                style={{ marginRight: 8 }}
              />
            </Box>
            <Typography variant="body1">{t("form.login.google")}</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Box
              sx={{
                margin: 2,
                border: border({
                  width: 1,
                  style: "solid",
                  color: "rgba(0, 0, 0, 0.12)",
                }),
                padding: padding(5, 30),
                fontWeight: 500,
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
                {t("form.login.or")}
              </Typography>
            </Box>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" color="secondary">
              {t("form.login.connectemail")}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValue}
        validationSchema={validation}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            //setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            {...others}
            className={formCss}
          >
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                {t("form.login.email")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label={t("form.login.email")}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                {t("form.login.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={t("form.login.password")}
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label={t("form.login.rememberme")}
              />
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
              >
                {t("form.login.forgotpassword")}
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {t("form.login.connect")}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
